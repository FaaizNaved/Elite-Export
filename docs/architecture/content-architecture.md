# Content Architecture Strategy (MDX-Based)

## Overview

For this project, the content architecture is designed to be **content-driven**, **scalable**, and **future-proof**.

Instead of hardcoding products, categories, descriptions, and images inside React components, the website will use **Markdown (MDX)** as the primary content source.

This approach separates **content** from **presentation**, making the application easier to maintain, extend, and eventually migrate to a CMS if required.

---

# Why MDX Instead of JSON?

While JSON works well for simple structured data, our products require rich content such as:

- Multiple paragraphs
- Bullet lists
- Tables
- Product specifications
- Rich formatting
- Images
- Videos (future)
- Downloads (future)

MDX allows us to combine structured metadata with rich content in a single file.

Each product becomes its own self-contained content document.

---

# Folder Structure

```
content/
│
├── site.config.ts
│
├── home/
├── about/
├── manufacturing/
├── technology/
├── quality/
├── export/
├── gallery/
├── testimonials/
│
└── categories/
    │
    ├── western-tack/
    │   │
    │   ├── category.json
    │   │
    │   ├── headstall/
    │   │   │
    │   │   ├── subcategory.json
    │   │   │
    │   │   ├── one-ear-headstall.mdx
    │   │   ├── browband-headstall.mdx
    │   │   ├── split-ear-headstall.mdx
    │   │   └── ...
    │   │
    │   ├── breast-collar/
    │   ├── reins/
    │   └── ...
    │
    ├── saddles/
    ├── bags/
    └── accessories/
```

The folder structure itself represents the business hierarchy.

```
Category
    ↓
Subcategory
    ↓
Product
```

No complex routing configuration is required.

---

# Product File Structure

Every product is represented by a single MDX file.

Example:

```
one-ear-headstall.mdx
```

Each file contains:

- Product metadata (Frontmatter)
- Rich product description
- Specifications
- Features
- SEO metadata

Example structure:

```markdown
---
title:
slug:
itemCode:

category:
subcategory:

shortDescription:
description:

material:
color:

featured:

thumbnail:
images:

seo:

relatedProducts:
---

# Product Description

Rich Markdown content goes here...
```

The frontmatter is used by the application to generate:

- Product pages
- SEO metadata
- Navigation
- Breadcrumbs
- Related products
- Category listings

The Markdown body is rendered as the product description.

---

# Images

Images are stored locally inside the project.

```
public/

images/

products/

western-tack/

headstall/

one-ear-headstall/

front.webp
side.webp
detail.webp
zoom.webp
```

Images are **not** embedded inside components.

Instead, the MDX frontmatter references them.

Benefits:

- Easy to replace
- Organized folder structure
- Fast loading
- Optimized using Next.js Image
- No external dependency

---

# Categories

Each category contains a small metadata file.

Example:

```
western-tack/

category.json
```

Contains:

- Category Name
- Slug
- Description
- Hero Image
- SEO Metadata

This information is used to automatically generate:

- Category pages
- Navigation
- Mega Menu
- Breadcrumbs

---

# Subcategories

Each subcategory contains its own metadata.

Example:

```
headstall/

subcategory.json
```

Contains:

- Name
- Slug
- Description
- Hero Image
- SEO

Products inside that folder automatically belong to that subcategory.

---

# Automatic Routing

Because the folder structure defines the hierarchy, URLs are automatically generated.

Example:

```
Products

↓

Western Tack

↓

Headstall

↓

One Ear Headstall
```

becomes

```
/products/western-tack/headstall/one-ear-headstall
```

No manual route creation.

---

# Automatic Navigation

The navigation is generated from the content.

If a new category is added:

```
Horse Saddles
```

the menu updates automatically.

No React code changes.

---

# Automatic Product Pages

Adding a new product requires only three steps:

### Step 1

Create a new MDX file.

Example:

```
new-product.mdx
```

### Step 2

Upload product images.

```
public/images/products/...
```

### Step 3

Commit and deploy.

That's it.

No routing changes.

No component changes.

No navigation updates.

No page creation.

Everything is generated automatically.

---

# Related Products

Related products are **not manually maintained**.

Instead, they are automatically calculated using:

- Same Category
- Same Subcategory
- Featured Products (fallback)

This means new products automatically appear in the related products section without editing existing files.

---

# SEO

Every MDX file contains metadata that is used to generate:

- Page Title
- Meta Description
- Open Graph Tags
- Twitter Cards
- Canonical URL
- Structured Data

No additional configuration is required.

---

# Benefits of This Architecture

✅ Content is separated from UI.

✅ Easy to maintain.

✅ Easy to scale.

✅ Easy to onboard new developers.

✅ Simple content updates.

✅ Automatic routing.

✅ Automatic navigation.

✅ Automatic breadcrumbs.

✅ Automatic SEO.

✅ Automatic product generation.

✅ Future CMS migration becomes straightforward.

---

# Future Migration

If the client later requests an Admin Panel or CMS, the frontend architecture remains unchanged.

Instead of reading content from MDX files, the application can read from:

- Sanity CMS
- Payload CMS
- Strapi
- Headless WordPress
- Database APIs

Since the UI is already data-driven, only the content source changes.

---

# Conclusion

This MDX-first architecture provides the perfect balance between simplicity and scalability.

For Version 1:

- No database
- No CMS
- No unnecessary complexity

Yet the project remains organized, maintainable, and production-ready.

Adding a new product is as simple as:

1. Create a new `.mdx` file.
2. Upload the corresponding images.
3. Commit and deploy.

No React code changes.

No routing changes.

No navigation changes.

No component modifications.

The website automatically discovers and renders the new content, making the system behave like a lightweight CMS while keeping the project fast, clean, and easy to maintain.