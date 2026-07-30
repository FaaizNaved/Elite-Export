UI Component Philosophy

We'll classify components into **5 layers**.

```
UI Components
│
├── 1. Layout Components
├── 2. Section Components
├── 3. Content Components
├── 4. Interactive Components
└── 5. Utility Components
```

# 1. Layout Components

These control the website structure.

```
layout/

Navbar
MegaMenu
MobileMenu
Footer
Container
Section
PageHeader
Breadcrumb
CTA Banner
```

## Mega Menu

Not a normal dropdown.

```
Products

──────────────────────────────

Western Tack

Headstall

Breast Collar

Reins

Horse Saddles

Leather Bags

Accessories

──────────────────────────────

Featured Product Image
```

# 2. Section Components

These build pages.

```
sections/

Hero

Section Header

Company Intro

Stats

Feature Grid

Timeline

Manufacturing Process

Technology Showcase

Category Showcase

Product Showcase

Gallery Preview

Quality Preview

Export Preview

CTA Section
```

# 3. Content Components

These render MDX content.

```
ProductCard

CategoryCard

SubcategoryCard

MachineCard

GalleryCard

CertificateCard

FeatureCard

StatCard

CountryCard

TestimonialCard

ValueCard

TimelineCard
```

## Product Card

One component.

Used

- Home
- Category
- Related Products

Different layouts

```
Grid

Carousel

Compact

Featured
```

## Category Card

Shows

- Image
- Name
- Product Count
- CTA

## Machine Card

One of my favorites.

Shows

Machine

↓

Image

↓

Short Description

↓

Capacity

↓

Learn More

## Gallery Card

Hover

↓

Zoom

↓

Open Lightbox

# 4. Interactive Components

These make the site feel premium.

```
Product Gallery

Image Lightbox

Zoom Viewer

Carousel

Accordion

Tabs

Counter

Scroll Progress

Video Player

Before/After (future)
```

## Product Gallery

This deserves its own system.

Features

Desktop

- Hover zoom
- Mouse wheel
- Fullscreen

Mobile

- Swipe
- Pinch
- Double tap

---

## Image Lightbox

Professional.

Supports

- Keyboard
- Touch
- Thumbnail strip
- Download disabled

---

## Carousel

Reusable.

Home

Products

Machines

Testimonials

Gallery

---

# 

# 5. Utility Components

Small but important.

```
Button

Badge

Chip

Tag

Divider

Icon

Tooltip

Modal

Spinner

Empty State

Skeleton

Pagination

Loading
```

# Forms

Instead of one big form.

We'll build reusable fields.

```
TextField

EmailField

PhoneField

CountrySelect

Textarea

Checkbox

FileUpload

SubmitButton
```

Buyer Enquiry

becomes

```
TextField

↓

EmailField

↓

PhoneField

↓

Country

↓

Textarea

↓

Submit
```

# Cards

Every card follows one design language.

```
Image

↓

Title

↓

Subtitle

↓

Description

↓

Action
```

No random layouts.

# Gallery System

Gallery is not just images.

It is

```
Album

↓

Category

↓

Images

↓

Lightbox
```

Very scalable.

# Machine Detail

Reusable layout.

```
Hero

↓

Overview

↓

Specifications

↓

Applications

↓

Products Produced

↓

Gallery

↓

Enquiry
```

---

# Product Detail

Reusable layout.

```
Hero

↓

Gallery

↓

Overview

↓

Features

↓

Specifications

↓

Material

↓

Related Products

↓

Enquiry
```

---

# Manufacturing Step

Reusable.

```
Large Image

↓

Title

↓

Description

↓

Process Number
```

Looks beautiful.

---

# Animation Components

Instead of writing Framer Motion everywhere.

We'll create wrappers.

```
FadeIn

SlideUp

Reveal

ScaleIn

Stagger

Marquee
```

Then

```
<FadeIn><ProductCard/></FadeIn>
```

Much cleaner.

---

# Icons

Centralized.

```
icons/

Arrow

Phone

Email

Location

Export

Machine

Quality

Leather

Packaging
```

---

# SEO Components

Even SEO gets components.

```
BreadcrumbSchema

ProductSchema

OrganizationSchema

FAQSchema
```

Reusable.

---

# Final Inventory

```
Layout
│
├── Navbar
├── MegaMenu
├── MobileMenu
├── Footer
├── Container
├── Section
├── Breadcrumb
└── CTA Banner

Sections
│
├── Hero
├── Section Header
├── Company Intro
├── Feature Grid
├── Stats
├── Timeline
├── Manufacturing Process
├── Technology Showcase
├── Product Showcase
├── Gallery Preview
├── Quality Preview
├── Export Preview
└── CTA Section

Content
│
├── Product Card
├── Category Card
├── Subcategory Card
├── Machine Card
├── Gallery Card
├── Certificate Card
├── Feature Card
├── Stat Card
├── Country Card
├── Testimonial Card
└── Value Card

Interactive
│
├── Product Gallery
├── Image Lightbox
├── Zoom Viewer
├── Carousel
├── Accordion
├── Tabs
├── Counter
├── Video Player
└── Scroll Progress

Forms
│
├── Text Field
├── Email Field
├── Phone Field
├── Country Select
├── Textarea
├── File Upload
└── Submit Button

Utilities
│
├── Button
├── Badge
├── Chip
├── Tag
├── Divider
├── Tooltip
├── Modal
├── Spinner
├── Skeleton
└── Pagination
```

---

# ⭐ One thing I want to add (this will be our secret weapon)

I want us to define **component variants** from the beginning.

For example, don't build just one `ProductCard`. Build a `ProductCard` that supports variants:

```
<ProductCardvariant="grid"/><ProductCard variant="featured"/><ProductCardvariant="compact"/><ProductCard variant="minimal"/>
```

The same idea applies to:

- `Hero` (home, page, split, video)
- `Button` (primary, secondary, outline, ghost)
- `SectionHeader` (centered, left, minimal)
- `CTASection` (dark, light, image background)

This gives us **one reusable component** instead of multiple almost-identical components. It keeps the codebase cleaner, makes design changes easier, and ensures the entire website feels visually consistent.