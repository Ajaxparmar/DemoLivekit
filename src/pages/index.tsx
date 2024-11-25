import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const VoiceBot = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Track if the email has been sent

  useEffect(() => {
    // Send email to the backend when the user signs in
    const sendEmailToBackend = async (gmail: string) => {
      try {
        await fetch('https://api.supermilla.com/email/set-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: gmail }),
        });
        console.log("Email sent successfully:", gmail);

        // Navigate to the home page
        router.push('/');
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    // Check if the session has user data and email hasn't been sent yet
    if (session && session.user?.email && !emailSent) {
      sendEmailToBackend(session.user.email);
      setEmailSent(true); // Mark email as sent
    }
  }, [session, emailSent, router]);

  const handleVoiceClick = () => {
    setIsListening(!isListening); // Toggle listening state
  };

  const handleLogin = () => {
    signIn("google");
  };

  const handleLogout = () => {
    signOut();
  };

  const navigateToAiVoice = () => {
    if (session && session.user) {
      router.push('/AiVoice');
    }
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-screen text-white bg-gray-800 bg-opacity-50 rounded-lg"
      style={{
        
          backdropFilter: 'blur(8px)',
          maxHeight: '45vh',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        background: 'radial-gradient(circle at center, #0c0f1f, #000000 80%)', padding: '20px',
      }}>
      <br />
      <div className="text-center flex flex-col items-center justify-center " >
        <div className="inline-block px-4 py-1 mb-2 text-xs md:text-sm font-medium bg-gray-800 bg-opacity-70 rounded-full">
          AI Voice Command
        </div>
   
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
          Effortless control<br />with Milla 2.0
             </h1>
             <img className="mt-4" src="http://127.0.0.1:5501/liveKit/check/backend/uploads/demo1.png" style={{width:200, height:200, borderRadius:100}}/>
    
      </div>

      <div
        className="flex-grow flex flex-col justify-center mt-10 w-4/5 w-full p-8 max-w-lg rounded-lg  text-gray-200 overflow-y-auto text-center text-white">
     
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-white">Welcome back</h2>

        {session?.user ? (
          <div>
            <p className="mb-6">Signed in as {session.user.email}</p>
            <button onClick={navigateToAiVoice} className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700" style={{
              background: 'linear-gradient(to right, #aa00ff, #ff007f)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              Go to AiVoice
            </button>
            <br />
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 mt-4">
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-6">Please enter your details to sign in.</p>
            <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700" style={{ background: '#f43f5e' }}>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceBot;
