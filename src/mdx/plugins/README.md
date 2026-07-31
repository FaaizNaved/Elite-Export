# MDX plugins

Remark/rehype plugins are configured in [`next.config.ts`](../../../next.config.ts), **by
name as a string**:

```ts
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", ["remark-toc", { heading: "Contents" }]],
  },
});
```

Turbopack passes plugin configuration to a Rust process, so a JavaScript function cannot be
handed to it — only a package name plus serializable options. That rules out local plugin
modules for now, which is why this folder holds no code.

If a custom transform becomes necessary, publish it (or add it as a workspace package) and
reference it by name here. Until then, prefer doing the work in the content loaders
(`src/lib/content`) where it is testable without a bundler.

Currently enabled:

- `remark-frontmatter` — strips the YAML block from the rendered body. The frontmatter
  *data* is read from disk and validated by `src/lib/content/source.ts`, not by a plugin.
