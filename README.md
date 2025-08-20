# Fallfest Interactive Sitemap

An interactive digital sitemap application that allows event attendees to explore vendors, activities, and navigate the festival grounds digitally.

## 🎯 Features

### Core Functionality
- **Interactive Map Interface**: Zoom, pan, and explore the festival layout
- **Vendor Information**: Detailed popups with descriptions, hours, and special offers
- **Category Filtering**: Filter by food, arts & crafts, activities, services, etc.
- **Search Functionality**: Find specific vendors or activities quickly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Experience Features
- **Favorites System**: Save and manage favorite vendors
- **Visit Tracking**: Mark vendors as visited
- **Social Sharing**: Share interesting finds with friends
- **Offline Capability**: Download map for offline use (planned)
- **GPS Integration**: Real-time positioning and navigation (planned)

### Technical Features
- **Real-time Updates**: Live vendor status and information
- **Performance Optimized**: Fast loading and smooth interactions
- **Accessibility**: WCAG 2.1 AA compliant design
- **Cross-browser Support**: Works on all modern browsers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Fallfest-Sitemap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Maps API (Optional)**
   ```bash
   # Create a .env file in the project root
   echo "VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here" > .env
   ```
   
   To get a Google Maps API key:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API"
   - Create credentials and copy your API key
   - Replace `your_google_maps_api_key_here` with your actual key

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main navigation header
│   ├── SearchBar.tsx   # Search functionality
│   ├── FilterPanel.tsx # Category and status filters
│   └── VendorPopup.tsx # Detailed vendor information
├── data/               # Static data and configuration
│   ├── vendors.ts      # Vendor information
│   └── mapConfig.ts    # Map layout and area definitions
├── store/              # State management
│   └── useStore.ts     # Zustand store configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Google Maps API** - Interactive mapping with custom markers and info windows
- **Google Maps React Wrapper** - React integration for Google Maps

### State Management
- **Zustand** - Lightweight state management
- **Local Storage** - Persistent user preferences

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing

## 📱 Usage Guide

### For Event Attendees

1. **Explore the Map**
   - Use pinch/scroll to zoom in and out
   - Drag to pan around the festival area
   - Click on any vendor marker for detailed information

2. **Find What You're Looking For**
   - Use the search bar to find specific vendors
   - Filter by category (food, arts, activities, etc.)
   - Toggle "Open now only" to see current vendors

3. **Personalize Your Experience**
   - Add vendors to your favorites
   - Mark vendors as visited
   - Share interesting finds with friends

4. **Navigate Efficiently**
   - Use the area color coding to understand the layout
   - Check vendor hours and special offers
   - Plan your route between different areas

### For Event Organizers

1. **Update Vendor Information**
   - Modify vendor data in `src/data/vendors.ts`
   - Update hours, descriptions, and special offers
   - Add new vendors or remove closed ones

2. **Customize the Layout**
   - Adjust area boundaries in `src/data/mapConfig.ts`
   - Modify colors and category icons
   - Update the base map coordinates

3. **Monitor Usage**
   - Track popular vendors and areas
   - Analyze user engagement patterns
   - Gather feedback for improvements

## 🔧 Configuration

### Customizing Vendor Data

Edit `src/data/vendors.ts` to modify vendor information:

```typescript
export const vendors: Vendor[] = [
  {
    id: 'unique-vendor-id',
    name: 'Vendor Name',
    category: 'food', // food, arts, activities, services, etc.
    description: 'Detailed vendor description',
    location: {
      x: 50, // Relative X position (0-100)
      y: 50, // Relative Y position (0-100)
      area: 'center', // Area identifier
      coordinates: [36.1627, -86.7816] // GPS coordinates
    },
    hours: '10:00 AM - 6:00 PM',
    specialOffers: ['Special offer 1', 'Special offer 2'],
    status: 'open', // open, closed, coming-soon
    featured: false
  }
];
```

### Customizing Map Areas

Edit `src/data/mapConfig.ts` to modify festival areas:

```typescript
export const mapConfig: MapConfig = {
  center: [36.1627, -86.7816], // Map center coordinates
  zoom: 18, // Initial zoom level
  areas: {
    'area-name': {
      name: 'Display Name',
      bounds: [[lat1, lng1], [lat2, lng2]], // Area boundaries
      color: '#3B82F6' // Area highlight color
    }
  }
};
```

## 🚀 Deployment

### Static Hosting (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   - Netlify, Vercel, or any static hosting service
   - GitHub Pages
   - AWS S3 + CloudFront

### Environment Variables

Create a `.env` file for production configuration:

```env
VITE_MAP_TILE_URL=https://your-tile-server.com/{z}/{x}/{y}.png
VITE_API_BASE_URL=https://your-api-server.com
```

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Real-time vendor status updates
- [ ] GPS integration and navigation
- [ ] Offline map downloads
- [ ] User accounts and profiles

### Phase 3 Features
- [ ] Augmented reality wayfinding
- [ ] Social features and reviews
- [ ] Analytics dashboard
- [ ] Multi-language support

### Phase 4 Features
- [ ] Push notifications
- [ ] Integration with event management systems
- [ ] Advanced routing algorithms
- [ ] Accessibility improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Leaflet.js** for the mapping functionality
- **Tailwind CSS** for the beautiful UI components
- **React Team** for the amazing framework
- **Event organizers** for the inspiration and feedback

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and FAQ

---

**Built with ❤️ for the Fallfest community** 