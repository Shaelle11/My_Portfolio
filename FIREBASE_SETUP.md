# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "my-portfolio-backend")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Setup Firestore Database

1. In Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

## Step 3: Setup Authentication (Optional)

1. Go to "Authentication" in Firebase console
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Create an admin user for your admin panel

## Step 4: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>) 
4. Enter app name (e.g., "Portfolio Admin")
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the firebaseConfig object

## Step 5: Update Firebase Configuration

Replace the configuration in `src/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Step 6: Setup Firestore Security Rules

In Firestore Database > Rules, add these rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    // WARNING: This is for development only!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**For production, use more restrictive rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contact messages - anyone can create, only authenticated users can read
    match /contacts/{contactId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Blog posts - anyone can read published posts, only authenticated users can manage
    match /blog_posts/{postId} {
      allow read: if resource.data.status == 'published' || request.auth != null;
      allow create, update, delete: if request.auth != null;
    }
    
    // Analytics data - only authenticated users
    match /analytics/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 7: Switch to Firebase Services

To use Firebase instead of localStorage, update your imports:

### For Contact Service:
```javascript
// Change from:
import { ContactService } from './services/ContactService';

// To:
import { ContactService } from './services/FirebaseContactService';
```

### For Blog Service:
```javascript
// Change from:
import { BlogService } from './services/BlogService';

// To:
import { BlogService } from './services/FirebaseBlogService';
```

## Step 8: Test the Setup

1. Submit a contact form message
2. Check Firestore console to see if data appears
3. Check admin dashboard to see if messages load
4. Test creating/editing blog posts

## Firestore Collections Structure

### contacts
```
{
  name: string,
  email: string,
  subject: string,
  message: string,
  read: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### blog_posts
```
{
  title: string,
  content: string,
  excerpt: string,
  category: string,
  tags: array,
  status: string, // 'draft' or 'published'
  featuredImage: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Free Tier Limits

Firebase Free Tier includes:
- **Firestore**: 50,000 reads, 20,000 writes, 1GB storage per day
- **Authentication**: Unlimited users
- **Hosting**: 10GB storage, 125 operations per month
- **Functions**: 125,000 invocations per month

This is more than enough for a portfolio website!

## Troubleshooting

### Common Issues:

1. **"Permission denied" errors**: Check Firestore rules
2. **"Firebase app not initialized"**: Check firebase.js configuration
3. **Network errors**: Check if Firebase project is active
4. **Import errors**: Make sure Firebase is installed: `npm install firebase`

### Development vs Production

- Use test mode rules during development
- Enable authentication for production
- Update security rules before going live
- Consider using Firebase hosting for deployment