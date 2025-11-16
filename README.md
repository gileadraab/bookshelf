![Logo](public/images/Bookshelf.png)

# Bookshelf - Android Reading Tracker

A beautiful, minimalist reading tracker to organize and rate your book collection. Built for Android with Java, featuring a warm, retro design inspired by classic libraries.

## ✨ Features

- **📖 Book Management** - Add, edit, and delete books from your collection
- **⭐ Rating System** - Rate books from 1-10 with an intuitive star interface
- **💭 Personal Notes** - Add comments and thoughts about each book
- **📱 Mobile-First Design** - Optimized for Android devices with responsive layouts
- **🎨 Retro Aesthetic** - Warm amber tones with vintage book illustrations
- **💾 Local Database** - Your data persists locally using Room Database
- **🚀 Fast & Lightweight** - Built with native Android technologies

## 🚀 Getting Started

### Prerequisites
- Android Studio Arctic Fox or newer
- JDK 8 or higher
- Android SDK with minimum API 24 (Android 7.0)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gileadraab/bookshelf.git
   cd bookshelf
   ```

2. **Open in Android Studio**
   - Open Android Studio
   - Select "Open an Existing Project"
   - Navigate to the cloned directory and select it

3. **Sync Gradle**
   - Android Studio will automatically prompt to sync Gradle
   - Wait for the sync to complete

4. **Run the app**
   - Connect an Android device or start an emulator
   - Click the "Run" button (green play icon)
   - Select your target device

## 🛠️ Built With

- **Java** - Primary programming language
- **Android SDK** - Android development framework
- **Material Components** - UI components following Material Design
- **Room Database** - Local data persistence
- **RecyclerView** - Efficient list display
- **CardView** - Card-based UI elements
- **Gradle** - Build system

## 📱 Architecture

### Project Structure
```
app/src/main/
├── java/com/bookshelf/
│   ├── MainActivity.java          # Main screen with book list
│   ├── model/
│   │   └── Book.java              # Book data model
│   ├── database/
│   │   ├── BookDatabase.java      # Room database
│   │   └── BookDao.java           # Database operations
│   ├── adapter/
│   │   └── BookAdapter.java       # RecyclerView adapter
│   └── ui/
│       ├── AddEditBookDialog.java # Add/Edit dialog
│       └── BookDetailDialog.java  # Book detail view
└── res/
    ├── layout/                     # XML layouts
    ├── values/                     # Colors, strings, themes
    └── drawable/                   # Vector graphics & icons
```

### Data Model
Books are stored with the following properties:
- **id**: Auto-generated unique identifier
- **title**: Book title (required)
- **author**: Author name (required)
- **rating**: 0-10 star rating
- **comment**: Optional personal notes
- **dateAdded**: Date when book was added

### UI Components
- **MainActivity**: Displays books in a single-column list
- **AddEditBookDialog**: Full-screen dialog for adding/editing books
- **BookDetailDialog**: Full-screen dialog showing book details
- **BookAdapter**: Manages book cards in RecyclerView with click handlers

## 🎨 Design Philosophy

- **Minimalist Interface** - Focus on your books, not the UI
- **Warm Color Palette** - Amber and orange gradient backgrounds
- **Vintage Inspiration** - Classic library aesthetics with book illustrations
- **Thoughtful Spacing** - Generous padding for visual comfort
- **Single Column Layout** - One book per row for easy reading

## 📖 Development

### Building the Project
```bash
./gradlew build
```

### Running Tests
```bash
./gradlew test
```

### Creating a Release Build
```bash
./gradlew assembleRelease
```

## 🔧 Configuration

The app uses the following Gradle configuration:
- **Compile SDK**: 34 (Android 14)
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)

## 📝 License

This project is open source and available for personal use.

**Happy Reading!** 📚✨
