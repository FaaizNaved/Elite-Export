# Image Storage & Asset Management Strategy

## Overview

For this project, all static assets (images, icons, videos, documents, etc.) will be stored **inside the project repository** rather than using a third-party cloud image service such as Cloudinary.

This approach keeps the project simple, cost-effective, and easy to maintain while still providing excellent performance through Next.js image optimization and Vercel's global CDN.

---

# Why Store Images Locally?

This website is primarily a:

- Company Website
- Product Showcase
- Manufacturing Showcase
- Gallery
- Buyer Enquiry Platform

It is **not** an e-commerce application where products and images change daily.

Most assets remain static for long periods of time.

Because of that, storing images locally provides several advantages.

## Benefits

- No additional cloud services
- No monthly image hosting cost
- No API keys to manage
- No vendor lock-in
- Easier deployment
- Simpler development workflow
- Better project portability
- Faster onboarding for new developers

---

# Project Asset Structure

All assets will be organized inside the `public` directory.

```
public/
│
├── images/
│   ├── hero/
│   ├── company/
│   ├── manufacturing/
│   ├── machinery/
│   ├── gallery/
│   ├── certificates/
│   └── products/
│
├── videos/
│
├── icons/
│
└── documents/
```

The `public` folder acts as the central asset repository for the website.

---

# Product Image Organization

Products should follow a consistent folder hierarchy.

Example:

```
public/

images/

products/

western-tack/

headstall/

one-ear-headstall/

one-ear-headstall-front.webp

one-ear-headstall-side.webp

one-ear-headstall-detail.webp

one-ear-headstall-zoom.webp
```

The folder hierarchy mirrors the product hierarchy:

```
Category

↓

Subcategory

↓

Product

↓

Images
```

This keeps the project intuitive and easy to navigate.

---

# Image Naming Convention

Avoid generic names such as:

```
1.webp
2.webp
3.webp
```

Instead, use descriptive filenames.

Example:

```
one-ear-headstall-front.webp

one-ear-headstall-side.webp

one-ear-headstall-detail.webp

one-ear-headstall-zoom.webp
```

Benefits:

- Easier to identify images
- Better project organization
- Simpler maintenance
- Easier replacement of assets
- More meaningful URLs
- Reduced confusion when clients send updated images

---

# How New Products Are Added

Suppose the client sends:

```
New Product

↓

5 Images
```

The workflow is extremely simple.

### Step 1

Create a new product folder.

Example:

```
public/

images/

products/

western-tack/

headstall/

new-product/
```

---

### Step 2

Upload the optimized images.

Example:

```
new-product-front.webp

new-product-side.webp

new-product-detail.webp

new-product-back.webp

new-product-zoom.webp
```

---

### Step 3

Create the corresponding MDX file.

```
new-product.mdx
```

---

### Step 4

Commit and deploy.

That's it.

No React component changes.

No routing changes.

No navigation updates.

No additional configuration.

The website automatically discovers and renders the new product.

---

# Image Optimization Strategy

Images should never be uploaded directly from a phone or camera.

Avoid:

```
IMG_20260730_123456.jpg

8 MB
```

Instead, every image should be optimized before being added to the project.

Preferred formats:

- WebP
- AVIF (where supported)

Target size:

- Thumbnail: 50–100 KB
- Product images: 150–300 KB
- Large gallery images: 250–500 KB
- Hero images: 300–700 KB (depending on dimensions)

The goal is to balance image quality with loading performance.

---

# Multiple Image Variants

Different sections of the website require different image sizes.

Recommended structure:

```
thumb.webp

gallery.webp

zoom.webp
```

or

```
thumbnail.webp

medium.webp

large.webp
```

Purpose:

- **Thumbnail** → Product listings and cards
- **Gallery** → Product detail page
- **Zoom** → Fullscreen image viewer

This ensures users only download the image size they actually need.

---

# Image Rendering Pipeline

Images are served using Next.js's built-in optimization.

```
public/

↓

next/image

↓

Automatic Optimization

↓

Vercel CDN

↓

User
```

Benefits:

- Automatic lazy loading
- Responsive image generation
- Modern image formats
- Global CDN delivery
- Excellent Lighthouse performance

---

# Product Gallery Experience

The gallery does not require any external image service.

Instead, the application provides a premium viewing experience using local assets.

Features:

- Hover zoom (desktop)
- Mouse wheel zoom
- Fullscreen lightbox
- Previous / Next navigation
- Thumbnail navigation
- Pinch-to-zoom (mobile)
- Swipe gestures
- Double-tap zoom

The image viewer loads the appropriate image variant depending on the viewing mode.

---

# Performance

Many developers assume:

> "Cloudinary is always faster."
> 

For this project, that assumption is unnecessary.

Because the website is deployed on Vercel:

```
Local Images

↓

Next.js Image Optimization

↓

Vercel Global CDN

↓

User
```

Performance remains excellent for a catalog consisting of hundreds of optimized images.

No external image CDN is required.

---

---

# Best Practices

✔ Store all assets inside the project.

✔ Use descriptive folder names.

✔ Use descriptive filenames.

✔ Optimize every image before committing.

✔ Prefer WebP.

✔ Use AVIF where appropriate.

✔ Never commit oversized original images.

✔ Keep image hierarchy consistent with product hierarchy.

✔ Use Next.js `next/image` for rendering.

✔ Separate thumbnails, gallery images, and zoom images when beneficial.

---

# Final Architecture

```
Next.js 16

↓

public/

↓

Optimized WebP / AVIF Assets

↓

MDX Content

↓

next/image

↓

Automatic Optimization

↓

Vercel CDN

↓

User
```

---

# Conclusion

For Version 1 of this project, storing assets locally is the most practical and maintainable solution.

It keeps the project:

- Fast
- Lightweight
- Cost-effective
- Easy to maintain
- Easy to deploy
- Easy to scale

Adding a new product requires only:

1. Create a new product image folder.
2. Upload optimized images.
3. Create the corresponding MDX file.
4. Commit and deploy.

No React code changes.

No routing changes.

No component modifications.

No navigation updates.

The architecture remains simple while providing a professional, production-ready workflow suitable for a premium B2B manufacturing website.