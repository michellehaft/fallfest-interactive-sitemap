# Vendor Images

This folder contains all images for the Eastwood Fallfest vendors.

## Folder Structure

```
public/images/vendors/
├── avatars/          # Circular avatar images (recommended: 150x150px)
├── details/          # Detail view images (recommended: 400x200px)
└── README.md         # This file
```

## Image Guidelines

### Avatar Images (`/avatars/`)
- **Size**: 150x150px (minimum)
- **Format**: JPG, PNG, or WebP
- **Naming**: Use vendor ID (e.g., `food-001.jpg`)
- **Usage**: Displayed in vendor modal header (circular crop)

### Detail Images (`/details/`)
- **Size**: 400x200px (recommended)
- **Format**: JPG, PNG, or WebP
- **Naming**: Use vendor ID (e.g., `food-001.jpg`)
- **Usage**: Displayed in vendor modal between description and features

## How to Reference in Code

In `src/data/vendors.ts`, reference images like this:

```typescript
{
  id: 'food-001',
  name: 'Vendor Name',
  image: '/images/vendors/avatars/food-001.jpg',          // Avatar image
  detailImage: '/images/vendors/details/food-001.jpg',    // Detail image
  // ... rest of vendor data
}
```

## Notes

- Images in the `public/` folder are served directly by Vite/React
- No need for imports - just reference the path starting with `/images/`
- Images will be automatically optimized by modern browsers
- Consider using WebP format for better compression