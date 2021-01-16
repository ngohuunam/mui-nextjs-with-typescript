declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_PRIVATE_KEY: string;
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      FIREBASE_CLIENT_EMAIL: string;
      NEXT_PUBLIC_FIREBASE_DATABASE_URL: string;
      NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
