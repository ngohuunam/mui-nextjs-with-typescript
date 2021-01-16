import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebaseClient, firebase } from "../firebase/firebase-client";

// const firebaseClient = initFirebase();

const AuthContext = createContext<{
  user: firebase.User | null;
  firebaseClient: typeof firebase;
}>({
  user: null,
  firebaseClient,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).nookies = nookies;
    }
    const subcribedAuth = firebaseClient.auth().onIdTokenChanged(
      async (user) => {
        console.log(`token changed!`);
        if (!user) {
          console.log(`no token found...`);
          setUser(null);
          nookies.destroy(null, "token");
          nookies.set(null, "token", "", {});
          return;
        }

        console.log(`updating token...`);
        const token = await user.getIdToken();
        setUser(user);
        nookies.destroy(null, "token");
        nookies.set(null, "token", token, {});
      },
      (err) => console.error(err)
    );
    return subcribedAuth;
  }, []);

  return (
    <AuthContext.Provider value={{ user, firebaseClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
