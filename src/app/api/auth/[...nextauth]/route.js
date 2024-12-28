import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    rolling:false,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only handle Google sign-ins
      if (account.provider === "google") {
        const db = await connectDB(); // Connect to MongoDB
        const existingUser = await db.collection("users").findOne({ email: user.email });
  
        if (!existingUser) {
          // Insert Google user into the database
          const newUser = {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            createdAt: new Date(),
          };
          
          await db.collection("users").insertOne(newUser);
        }
      }
      return true; // Proceed with sign-in
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user; // Attach user data to session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Store user data in token
      }
      return token;
    },
  },
  

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

