/**
 * Intrinsic size, read from the file.
 *
 * A photograph's dimensions are a property of the file, not a claim about it.
 * Visual Design System §30.2 and §32.3 gate on that number — whether a frame
 * can be delivered at the evidence threshold — and Master Implementation
 * Blueprint R7.1 is unambiguous about what happens when a fact is expressible
 * in two places: it will eventually disagree with itself.
 *
 * So the number is measured, never typed. This module reads it out of the
 * header of the three formats the library holds, which is a few dozen bytes per
 * file and no dependency (R4.4: the cheapest thing to maintain is the thing
 * that was never built).
 *
 * Traces to: VDS §30.2, §32.3; Photography Direction §22.4 (one canonical
 * crop — one file, one ratio); MIB R7.1, R15.2.
 */

export interface IntrinsicSize {
  readonly width: number;
  readonly height: number;
}

/** WebP: a RIFF container whose first chunk carries the dimensions. */
function webp(buffer: Buffer): IntrinsicSize | undefined {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return undefined;
  }

  const chunk = buffer.toString("ascii", 12, 16);

  // Lossy. 14 bytes in: a 3-byte start code, then 14-bit width and height.
  if (chunk === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  // Lossless. 21 and 21 bits, packed across four bytes, each stored minus one.
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  // Extended. A 24-bit canvas size, stored minus one.
  if (chunk === "VP8X") {
    return {
      width: (buffer.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (buffer.readUIntLE(27, 3) & 0xffffff) + 1,
    };
  }

  return undefined;
}

/** PNG: the IHDR chunk is always first, at a fixed offset. */
function png(buffer: Buffer): IntrinsicSize | undefined {
  if (buffer.readUInt32BE(0) !== 0x89504e47) return undefined;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

/** JPEG: walk the segments to the first start-of-frame marker. */
function jpeg(buffer: Buffer): IntrinsicSize | undefined {
  if (buffer.readUInt16BE(0) !== 0xffd8) return undefined;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    // SOF0…SOF15, excluding the four that are not frame headers.
    const isFrameHeader =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

    if (isFrameHeader) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }

    offset += 2 + buffer.readUInt16BE(offset + 2);
  }

  return undefined;
}

/**
 * Reads the dimensions out of an image's header.
 *
 * Returns `undefined` for a format this cannot read rather than guessing — a
 * frame whose size is unknown cannot be shown to reach the threshold (VDS
 * §30.2), and `ContentImage` already renders nothing without one. An
 * unmeasurable file is a finding, not a default.
 */
export function intrinsicSize(buffer: Buffer): IntrinsicSize | undefined {
  if (buffer.length < 32) return undefined;

  const size = webp(buffer) ?? png(buffer) ?? jpeg(buffer);
  return size && size.width > 0 && size.height > 0 ? size : undefined;
}
