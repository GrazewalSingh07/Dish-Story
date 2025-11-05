# Dish Story 🍽️

An immersive food delivery story experience built with React and Vite. Browse dishes from multiple restaurants with interactive ingredient hotspots, customize dishes, and add items to your cart—all in a full-screen, Instagram Stories-like interface.

## 🎯 Overview

Dish Story is a modern web application that transforms the food ordering experience into an interactive story format. Users can swipe through restaurants, explore dishes with interactive hotspots, customize ingredients, and build their cart—all with smooth animations and intuitive navigation.

## ✨ Features

### Core Features

- **Vertical Restaurant Navigation**: Swipe up/down to switch between restaurants
- **Horizontal Dish Navigation**: Tap left/right edges (30% zones) to navigate between dishes
- **Interactive Hotspots**: Click pulsing hotspots on dish media to view ingredient details
- **Progress Indicators**: Visual progress bars showing completion status for each dish
- **Media Support**: Both images and videos with custom video controls

### Customization Features

- **Dish-Level Customization Panel**: 
  - Adjust ingredient quantities with +/- controls
  - Remove ingredients
  - Replace ingredients with substitutions
  - Real-time price calculations
  - Running adjustments display
- **Ingredient-Level Customization**: Click hotspots to view ingredient details and customize
- **Visual Feedback**: Customized ingredients show yellow hotspots
- **Persistence**: All customizations saved to localStorage

### Cart Features

- **Add to Cart**: Add customized dishes to cart
- **Cart Badge**: Visual indicator showing item count in header
- **Toast Notifications**: Success feedback with undo option (5 seconds)
- **Price Display**: Shows customization count and final price on button

### User Experience

- **Network Status Detection**: Disables CTAs when offline
- **Video Controls**: Play/pause, time display, mute/unmute toggle
- **Progress Pausing**: Progress automatically pauses when:
  - Ingredient card is open
  - Customization panel is open
- **Responsive Design**: Full-screen immersive experience
- **Smooth Animations**: Pulsing hotspots, toast notifications, transitions

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **React Hooks** - State management and side effects
- **Context API** - Global state (Cart, Customization, Toast)
- **Local Storage** - Data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── ActionButtons.jsx          # Customize & Add to Cart buttons
│   ├── CartIcon.jsx               # Cart icon with badge
│   ├── CustomizationPanel.jsx    # Ingredient-level customization
│   ├── DishCustomizationPanel.jsx # Dish-level customization bottom sheet
│   ├── Header.jsx                 # App header with restaurant name
│   ├── Hotspots.jsx               # Interactive ingredient hotspots
│   ├── IngredientCard.jsx         # Ingredient detail modal
│   ├── ProgressBars.jsx           # Dish progress indicators
│   ├── RestaurantStory.jsx        # Main restaurant story component
│   ├── StoryFeed.jsx              # Restaurant feed container
│   ├── Toast.jsx                  # Toast notification component
│   └── VideoControls.jsx          # Video player controls
├── context/
│   ├── CartContext.jsx            # Cart state management
│   ├── CustomizationContext.jsx   # Customization state management
│   └── ToastContext.jsx           # Toast notification management
├── hooks/
│   ├── useIngredientCard.jsx      # Ingredient card logic
│   ├── useMediaNavigation.jsx     # Horizontal navigation logic
│   ├── useNetworkStatus.jsx       # Network status detection
│   └── useProgress.jsx             # Progress bar logic
├── data/
│   └── mockData.js                # Restaurant and dish data
├── utils/
│   └── localStorage.js            # LocalStorage utilities
└── App.jsx                         # Root component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Dish Story"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How It Works

### Navigation Flow

1. **Vertical Swipe**: Swipe up/down to change restaurants
2. **Horizontal Tap**: Tap left 30% of screen → previous dish, right 30% → next dish
3. **Hotspot Click**: Click pulsing circles on dish media to view ingredients
4. **Customize**: Click "Customize" button to open dish customization panel

### Customization Flow

1. **Open Customization Panel**: Click "Customize" button
2. **Adjust Ingredients**: 
   - Use +/- to change quantities
   - Click "remove" to remove ingredients
   - Click "Replace →" to substitute ingredients
3. **View Changes**: See running price adjustments in real-time
4. **Save**: Click "Update & Close" to save changes
5. **Add to Cart**: Button shows modification count and final price

### Hotspot Interaction

1. **View Ingredient**: Click hotspot to see ingredient details
2. **See Modifications**: If customized, view all modifications made
3. **Customize**: Click "Customize" button to make changes
4. **Close**: Swipe down or click outside to close

### Progress System

- Each dish has a progress bar that fills over time (5s for images, video duration for videos)
- Progress automatically pauses when:
  - Ingredient card is open
  - Customization panel is open
- Progress resumes when panels close
- Auto-advances to next dish when progress reaches 100%

## 🎨 Key Components

### StoryFeed
- Manages vertical navigation between restaurants
- Handles touch and mouse events for swiping
- Renders current restaurant story

### RestaurantStory
- Displays restaurant dishes
- Manages dish navigation
- Handles media (images/videos)
- Coordinates progress, hotspots, and overlays

### DishCustomizationPanel
- Bottom sheet interface for dish customization
- Shows all ingredients with controls
- Real-time price calculations
- Persistent state management

### Hotspots
- Interactive pulsing circles on media
- Color changes when ingredients are customized
- Prevents navigation conflicts

### IngredientCard
- Modal showing ingredient details
- Nutrition information
- Allergen warnings
- Modification history display

## 💾 Data Persistence

- **Cart**: Saved to localStorage, persists across sessions
- **Customizations**: Saved to localStorage, persists across tabs
- **State Recovery**: Automatically loads on app startup

## 🤝 Development Tools

This project was developed with the assistance of:

- **Cursor AI** - AI-powered code editor for development assistance, code generation, and debugging
- **Perplexity** - AI research assistant used for initial data structure design and feature planning

## 📝 Notes

- The app uses mock data from `src/data/mockData.js`
- All images are loaded from external URLs (Unsplash, Pexels)
- Video files are stored locally in `src/assets/`
- Network status detection prevents actions when offline
- Toast notifications provide user feedback with undo functionality

## 🐛 Known Limitations

- Hotspot positions are manually configured in mock data
- No backend integration (localStorage only)
- Video must be stored locally or use absolute URLs

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using React, Vite, and Tailwind CSS
