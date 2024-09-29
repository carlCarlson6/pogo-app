import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
};
