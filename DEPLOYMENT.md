# Deployment Guide (Firebase Hosting)

Since you are already using Firebase for Authentication, **Firebase Hosting** is the easiest and best way to deploy your app.

## Prerequisites

You need the Firebase CLI. You can run it using `npx` without installing it globally.

## Step 1: Login to Firebase

Run the following command in your terminal:

```bash
npx firebase login
```

-   This will open your browser.
-   Log in with the same Google account you used to create the Firebase project (`infographic-14f73`).

## Step 2: Initialize Hosting

Run this command to set up hosting in your project folder:

```bash
npx firebase init hosting
```

**Follow these interactive prompts:**

1.  **Are you ready to proceed?** -> `Y`
2.  **Please select an option:** -> Select `Use an existing project`
3.  **Select a default Firebase project:** -> Choose `infographic-14f73` (your current project)
4.  **What do you want to use as your public directory?** -> Type `dist` (Vite builds to this folder)
5.  **Configure as a single-page app (rewrite all urls to /index.html)?** -> `Y` (Important for React Router/SPAs)
6.  **Set up automatic builds and deploys with GitHub?** -> `N` (Keep it simple for now)
7.  **File dist/index.html already exists. Overwrite?** -> `N` (Do NOT overwrite if asked, we will rebuild anyway)

## Step 3: Build the Project

Create the production build of your app:

```bash
npm run build
```

## Step 4: Deploy

Upload your files to Firebase:

```bash
npx firebase deploy
```

## Step 5: **CRITICAL** - Authorize the Domain

After deployment, Firebase will give you a URL (e.g., `https://infographic-14f73.web.app`).

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project.
3.  Go to **Authentication** -> **Settings** -> **Authorized domains**.
4.  Ensure your new hosting domain (e.g., `infographic-14f73.web.app`) is listed there. If not, add it.
    *   *Note: Firebase usually adds default hosting domains automatically, but it's good to check if login fails.*

## Sharing

Send the URL to your friends! They can now log in and generate infographics.
