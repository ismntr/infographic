# How to Create a Throwaway Firebase Project for Testing

Follow these steps to get your keys safely and for free.

## Part 1: Create the Firebase Project
1.  Go to [console.firebase.google.com](https://console.firebase.google.com/) and log in with your Google account.
2.  Click **"Create a project"** (or "Add project").
3.  **Name**: Enter something like `test-infographic-app`.
4.  **Google Analytics**: You can toggle this **OFF** for a test project.
5.  Click **"Create project"** and wait for it to finish.

## Part 2: Enable Authentication
1.  Once inside your new project, look for **"Build"** in the left sidebar and click **"Authentication"**.
2.  Click **"Get started"**.
3.  In the **"Sign-in method"** tab, click **"Google"**.
4.  Toggle **"Enable"** to ON.
5.  **Support email**: Select your own email from the dropdown.
6.  Click **"Save"**.

## Part 3: Get Your Keys (The Config)
1.  Click the **Project Overview** (gear icon) at the very top of the left sidebar -> **Project settings**.
2.  Scroll down to the **"Your apps"** section.
3.  Click the **Web icon** (`</>`) to create a web app.
4.  **App nickname**: `My App` (doesn't matter).
5.  Uncheck "Also set up Firebase Hosting" (we don't need it yet).
6.  Click **"Register app"**.
7.  **COPY THE CONFIG**: You will see a code block with `const firebaseConfig = { ... }`.
    -   Copy the values inside the quotes for `apiKey`, `authDomain`, etc.
    -   Paste them into your `.env` file in VS Code.

## Part 4: Enable AI (Critical for Image Generation)
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  In the top blue bar, click the project dropdown and select the project you just created (it will have the same name).
3.  In the search bar at the top, type **"Vertex AI API"**.
4.  Click **"Vertex AI API"** from the Marketplace results.
5.  Click **"ENABLE"**. (This might take a minute).
    *Note: You might need to link a billing account for Vertex AI, even for the free tier. If you strictly want to avoid this, you can skip this part, but the "Generate" button in the app will fail. The Login will still work.*

## Part 5: Update Your .env File
Your `.env` file should look like this (replace with your copied values):

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=test-infographic-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=test-infographic-app
VITE_FIREBASE_STORAGE_BUCKET=test-infographic-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:12345...
VITE_GOOGLE_CLOUD_PROJECT_ID=test-infographic-app
```
