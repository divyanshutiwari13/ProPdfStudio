# SEO Setup Guide

This document outlines the SEO configuration for ProPDF Studio.

## Overview

The project has been configured with comprehensive SEO features including:
- Meta tags (title, description, keywords)
- Open Graph tags for social media sharing
- Twitter Card metadata
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- PWA Manifest

## Files Created/Modified

### Core SEO Files

1. **`app/layout.tsx`** - Enhanced with comprehensive metadata including:
   - Open Graph tags
   - Twitter Card metadata
   - Robots configuration
   - Verification codes (Google, Yandex, Yahoo)
   - Canonical URLs

2. **`app/sitemap.ts`** - Dynamic sitemap generation including:
   - All static pages
   - All tool pages
   - Proper priority and change frequency

3. **`app/robots.ts`** - Robots.txt configuration:
   - Allows all search engines
   - Disallows API routes and private pages
   - Points to sitemap

4. **`app/manifest.ts`** - PWA manifest for mobile app support

### Page-Specific SEO

Each page has been enhanced with appropriate metadata:

- **Homepage** (`app/page.tsx`):
  - Structured data (WebApplication schema)
  - Organization schema
  - Enhanced metadata

- **Tool Pages** (`app/tools/*/layout.tsx`):
  - Individual metadata for each tool
  - Tool-specific keywords
  - Open Graph tags

- **Other Pages**:
  - Contact, Privacy, Terms pages have enhanced metadata
  - Login/Register pages are set to noindex

## Environment Variables

Add these to your `.env` file for full SEO functionality:

```env
# Site URL (required for sitemap and Open Graph)
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Search Engine Verification (optional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_verification_code
NEXT_PUBLIC_YAHOO_VERIFICATION=your_yahoo_verification_code
```

## Images Required

For optimal SEO, create these images:

1. **`public/og-image.png`** (1200x630px)
   - Used for Open Graph and Twitter Card previews
   - Should represent your brand/application

2. **`public/icon-192.png`** (192x192px)
   - PWA icon for mobile devices

3. **`public/icon-512.png`** (512x512px)
   - PWA icon for mobile devices

4. **`public/logo.png`** (recommended)
   - Used in structured data

## Structured Data

The homepage includes:
- **WebApplication** schema - Describes the application
- **Organization** schema - Company information

## Sitemap

The sitemap is automatically generated and includes:
- Homepage (priority: 1.0, daily)
- Tools page (priority: 0.9, daily)
- Individual tool pages (priority: 0.8, weekly)
- Contact, Privacy, Terms (priority: 0.3-0.5, monthly)

Access at: `https://yourdomain.com/sitemap.xml`

## Robots.txt

Access at: `https://yourdomain.com/robots.txt`

Configuration:
- Allows all search engines
- Disallows: `/api/`, `/dashboard`, `/login`, `/register`
- Points to sitemap

## Testing SEO

1. **Google Search Console**: Submit your sitemap
2. **Google Rich Results Test**: Test structured data
3. **Facebook Sharing Debugger**: Test Open Graph tags
4. **Twitter Card Validator**: Test Twitter Cards
5. **Lighthouse**: Run SEO audit

## Next Steps

1. Create the required images (og-image.png, icons)
2. Set up environment variables
3. Submit sitemap to Google Search Console
4. Add social media links to structured data
5. Monitor SEO performance in Google Analytics

## Notes

- All metadata is dynamically generated
- Sitemap updates automatically when new tools are added
- Client-side pages use layout.tsx files for metadata
- Private pages (login, register, dashboard) are set to noindex

