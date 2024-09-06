import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://somuojwkvnffjfvgueeu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbXVvandrdm5mZmpmdmd1ZWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMDczNzIsImV4cCI6MjA0MDU4MzM3Mn0.knKxnVsGbbq6_3xzOVhr3VnBxBboilIrvrNOw5Qan-A')

export default function App() {
  const [session, setSession] = useState<Session|null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<>
      <div>Logged in!</div>
      <p>{session.access_token}</p>
    </>)
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);