# AI Infographic Generator

An open-source, client-side Single Page Application (SPA) that generates infographics using AI.

**Features:**
*   **AI Image Generation**: Uses [Pollinations.ai](https://pollinations.ai/) (Free, No API Key required).
*   **Authentication**: Google Login via Firebase Authentication.
*   **Styles**: Choose between "Technical Blueprint" and "Warm Mind Map" styles.
*   **Tech Stack**: React, Vite, Tailwind CSS.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/infographic.git
    cd infographic
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    *   Create a project at [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Authentication** (Google Provider).
    *   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Fill in your Firebase config values in `.env`.

4.  **Run locally:**
    ```bash
    npm run dev
    ```

## Deployment

This project can be deployed to Firebase Hosting, Vercel, or Netlify.

### Firebase Hosting
1.  `npm run build`
2.  `npx firebase login`
3.  `npx firebase init hosting`
4.  `npx firebase deploy`

## License

MIT
