// pages/login.js
import { GoogleOAuthProvider, GoogleLogin,CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";

const Login1 = () => {
  const router = useRouter();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">

        {/* Title and Subtitle */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-600 mb-6">Please enter your details to sign in.</p>

        {/* Social Login Buttons */}
        <div className="flex space-x-4 mb-6">
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

export default Login1;
