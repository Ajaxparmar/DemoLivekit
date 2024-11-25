import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "338976857027-i89j2ded9t25naq8dc6n0j9afiehaap2.apps.googleusercontent.com", // Non-null assertion
      clientSecret: "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", // Non-null assertion
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {  
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
