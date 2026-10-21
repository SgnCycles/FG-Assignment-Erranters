"use client";
import { createClient } from "@/lib/supabase/browserClient";
import { getUserProfile, UserProfileType } from "@/lib/supabase/queries";
import { userContextType } from "@/types/types";
import type { User } from "@supabase/supabase-js";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const UserContext = createContext<userContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const supabase = createClient();
    const fetchUserProfile = async (id: string) => {
      const { data: userProfileData } = await getUserProfile(id);
      setUserProfile(userProfileData);
    };

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoggedIn(!!user);

      if (!user) {
        setUserProfile(null);
      }

      if (user) {
        fetchUserProfile(user.id);
      }
    };

    getUser();

    const { data: sessionData } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
          const currentUser = session?.user ?? null;
          setUser(currentUser);
          setIsLoggedIn(!!currentUser);

          if (currentUser) {
            fetchUserProfile(currentUser.id);
          } else {
            setUserProfile(null);
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUserProfile(null);
          setIsLoggedIn(false);
          // } else if (event === "PASSWORD_RECOVERY") {
          // } else if (event === "USER_UPDATED") {
        }
      },
    );

    return () => {
      sessionData.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};