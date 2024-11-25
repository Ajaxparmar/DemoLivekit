
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { GoogleOAuthProvider, GoogleLogin,CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";



const VoiceBot = () => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening); // Toggle listening state
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle email/password login here
    console.log("Logging in with email and password:", email, password);
  };

  const handleGoogleSuccess = async (response:CredentialResponse) => {
    const jwtToken = response.credential;

    // Decode JWT token to extract the user's email
    if (jwtToken) {
      const decodedToken = jwtDecode<{ email: string }>(jwtToken);
      const gmail = decodedToken.email;
      console.log("Email id:-",gmail);

    // Send email to the backend
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
  }
  };

  return (
    <div
      className="relative flex flex-col items-center min-h-screen text-white"
      style={{
        background: 'radial-gradient(circle at center, #0c0f1f, #000000 80%)',padding:'20px', boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      }}
    >
    
 

      {/* Title and Voice Command Badge */}
      <br></br>
      <div className="text-center mt-16" >
        <div className="inline-block px-4 py-1 mb-2 text-xs md:text-sm font-medium bg-gray-800 bg-opacity-70 rounded-full">
          AI Voice Command
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
          Effortless control<br />with Milla 2.0
        </h1>
      </div>

      {/* Transcript Box with Full Height */}
      <div
        className="flex-grow mt-10 w-4/5 w-full p-8  max-w-lg  rounded-lg bg-gray-800 bg-opacity-50 text-gray-200 overflow-y-auto text-center text-white"
        style={{
          backdropFilter: 'blur(8px)',
          maxHeight: '45vh',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )' // Set max height for the transcript box
        }}
      >
          {/* Title and Subtitle */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-white">Welcome back</h2>
        <p className="text-sm text-gray-600 mb-6">Please enter your details to sign in.</p>


        <div className="flex space-x-4 mb-6 flex justify-center">
          <GoogleOAuthProvider clientId="338976857027-7eaird3188j265pb2vf0ltmt7m53o01c.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
            />
          </GoogleOAuthProvider>
        </div>


          {/* Divider */}
          <div className="flex items-center mb-6">
          <span className="w-full border-t border-gray-300"></span>
          <span className="px-4 text-gray-500">OR</span>
          <span className="w-full border-t border-gray-300"></span>
        </div>

        
        <p className="mt-6 text-sm text-gray-600">
          Don't have an account yet? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>


 
    </div>
  );
};

export default VoiceBot;
