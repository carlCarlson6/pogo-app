import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { create } from 'zustand'
import { env } from "../utils/env";

export const sessionStore = create<{ 
  session: Session|null,
  setSession: (session: Session|null) => void,
}>()((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export const useSession = () => sessionStore(x => x.session);
export const useSetSession = () => sessionStore(x => x.setSession);

export const useFetchSession = () => {
  const {session, setSession} = sessionStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: {subscription} } = supabase.auth.onAuthStateChange((_, session) => {
      console.log(session);
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return session;
};

export const supabase = createClient(env.Supabase.Url, env.Supabase.AnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})