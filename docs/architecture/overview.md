# Project Goal

**A premium B2B leather manufacturing website**, inspired by SB Leathers in terms of content and business flow, but completely redesigned with a modern, luxury UI/UX.

This is **not** an e-commerce website.

The goal is to:

- Showcase the company
- Showcase craftsmanship
- Showcase products
- Build trust
- Generate buyer enquiries
- Impress international buyers

---

# Tech Stack

## Framework

- **Next.js 16** (App Router)

Reason:

- Excellent SEO
- Fast
- Image optimization
- Route Handlers
- Server Components

---

## Language

- **TypeScript**

---

## Styling

- **Tailwind CSS v4**

---

## UI Components

- **shadcn/ui**

Only when necessary.

We don't want a typical shadcn-looking website.

---

## Animation

- **Framer Motion**

For

- Hero reveal
- Scroll reveal
- Stagger animation
- Image transitions
- Text animations
- Hover interactions
- Page transitions

---

## Smooth Scrolling

- **Lenis**

For premium smooth scrolling.

---

## Icons

- **Lucide React**

---

## Forms

- **React Hook Form**

---

## Validation

- **Zod**

---

## Email

- **Next.js Route Handlers**
- **Nodemailer**

Later we can move to Resend if required.

---

## Images

- **next/image**

---

## Fonts

Heading

- Playfair Display

Body

- Inter

---

# Backend

## Separate backend?

**No.**

---

We'll only use

```
Next.js Route Handlers

/app/api/contact

/app/api/buyer-enquiry
```

These APIs will

- Send owner email
- Send customer acknowledgement email

No Express.

No .NET.

No Spring Boot.

---

# Database

**None.**

No

- MongoDB
- PostgreSQL
- MySQL

Everything is static.

---

# CMS

No CMS.

Instead we'll build our own lightweight content system.

---

# Content Source

We'll use

## MDX

instead of hardcoding content.

Every product becomes a content file.

---

Example

```
content/

categories/

western-tack/

headstall/

one-ear-headstall.mdx
```

Each file contains

- Title
- Description
- Item Code
- Images
- Features
- Material
- Category
- Subcategory

---

# Images

Store locally.

Never use Cloudinary initially.

Structure

```
public/

images/

products/

gallery/

about/

hero/

company/

certificates/
```

Images will be

- .webp
- Optimized
- Compressed

---

# Product Images

Example

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

Never

```
1.webp

2.webp

3.webp
```

Use meaningful filenames.

---

# Product Hierarchy

Exactly like SB Leathers.

```
Products

↓

Category

↓

Subcategory

↓

Product

↓

Gallery
```

Example

```
Products

↓

Western Tack

↓

Headstall

↓

One Ear Headstall
```

---

# Product Page

Contains

- Hero Image
- Gallery
- Zoom
- Description
- Features
- Material
- Item Code
- Related Products
- Enquiry Button

No pricing.

No Add to Cart.

---

# Image Viewer

Desktop

- Hover zoom
- Mouse wheel zoom
- 
    - / -
- Fullscreen

Mobile

- Pinch zoom
- Swipe
- Double tap

---

# Buyer Enquiry

Professional B2B form.

Fields

- Company Name
- Contact Person
- Country
- Business Type
- Phone
- WhatsApp
- Email
- Interested Products
- Estimated Quantity
- Message
- Reference Image (optional)

---

# Contact Form

Fields

- Name
- Email
- Phone
- Country
- Reason
- Message

Submission

↓

Owner Email

↓

Customer Thank You Email

---

# Emails

Owner

Contains

- Name
- Email
- Mobile
- Country
- Reason
- Message
- Date
- Time

Customer

Professional HTML email.

Message

> Thank you for contacting us.
> 
> 
> Our team will review your enquiry and connect with you within **2 business days**.
> 

---

# Folder Structure

```
leather-website/

app/
│
├── (site)/
│   ├── page.tsx
│   ├── about/
│   ├── products/
│   ├── gallery/
│   ├── certifications/
│   ├── buyer-enquiry/
│   └── contact/
│
├── api/
│   ├── contact/
│   └── buyer-enquiry/
│
├── layout.tsx
└── globals.css

components/
│
├── layout/
├── common/
├── home/
├── about/
├── products/
├── gallery/
├── contact/
├── enquiry/
├── ui/

content/
│
├── company/
│
├── categories/
│   ├── western-tack/
│   │   ├── category.json
│   │   ├── headstall/
│   │   │   ├── one-ear-headstall.mdx
│   │   │   ├── browband-headstall.mdx
│   │   └── breast-collar/
│   │
│   ├── saddles/
│   ├── bags/
│   └── accessories/
│
├── gallery/
├── certificates/
└── testimonials/

public/
│
├── images/
│   ├── hero/
│   ├── company/
│   ├── gallery/
│   ├── certificates/
│   └── products/
│
├── videos/
└── icons/

lib/
│
├── email/
├── mdx/
├── animations/
├── constants/
├── utils/
└── seo/

hooks/

types/

styles/
```

---

# Routing

Automatic.

Example

```
/products/western-tack/headstall/one-ear-headstall
```

Generated from MDX.

No manual pages.

---

# Navigation

Generated from categories.

If we add

```
Horse Saddle
```

Navigation updates automatically.

---

# SEO

Every product page gets

- Dynamic Title
- Meta Description
- Open Graph
- Structured Data
- Canonical URL

Generated from MDX.

---

# Performance

Target

- Performance ≥ 95
- SEO = 100
- Accessibility ≥ 95
- Best Practices = 100

---

# Responsiveness

Designed separately for

- Mobile
- Tablet
- Laptop
- Desktop
- Ultra-wide

Not just shrinking desktop layouts.

---

# Design Philosophy

Luxury.

Minimal.

Editorial.

Cinematic.

Warm.

Craftsmanship-focused.

Storytelling over selling.

---

# Development Philosophy

- Server Components by default.
- Client Components only when interactivity or animation requires them.
- Reusable, generic components that render content from MDX.
- Keep business content separate from UI.
- Never hardcode product information inside React components.
- Use semantic HTML and accessibility best practices.
- Optimize images before adding them to the project.

---

## One small enhancement I'd make

For long-term maintainability, I'd introduce a **single content configuration file**, for example:

```
content/
├── site.config.ts
```

This would hold global information like:

- Company name
- Logo paths
- Contact details
- Social links
- Navigation settings
- Default SEO metadata
- Email addresses

That way, if the client changes a phone number, email, or branding, you update it in **one place**, and the entire site reflects the change automatically.

---

I genuinely think this architecture will give you a codebase that feels professional from day one, is easy to maintain, and can evolve into a CMS-backed solution later without rewriting the frontend.