# Google Maps Setup Instructions

## Quick Setup

1. **Create environment file:**
   ```bash
   # In your project root, create a .env file
   touch .env
   ```

2. **Add your Google Maps API key to the .env file:**
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. **Get a Google Maps API key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable "Maps JavaScript API"
   - Go to "Credentials" and create an API key
   - Copy the API key to your .env file

4. **Restart the development server:**
   ```bash
   npm run dev
   ```

## What happens after setup:

- ✅ Interactive Google Map with custom vendor markers
- ✅ Click markers to see vendor info windows  
- ✅ Automatic map bounds fitting to show all vendors
- ✅ Custom category-colored markers with emoji icons
- ✅ Filtering works with the map markers
- ✅ Search functionality integrated with map

## Current Demo Mode:

Without the API key, you'll see a beautiful demo interface showing:
- All vendor information in a grid layout
- Category icons and status indicators
- Setup instructions
- Full filtering and search functionality

The demo mode is fully functional for testing all features except the actual map!