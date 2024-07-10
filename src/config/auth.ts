import { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  // debug: process.env.NODE_ENV === "development",

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        return {
          id: "1",
          name: "John",
          email: "j@j.com",
          image: "https://i.pravatar.cc/300",
        } as User;
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      const trigger = params.trigger;

      if (!trigger) return params.token;

      const provider = params.account?.provider;
      const email = params.token.email;
      // @ts-ignore
      const isVerified = params?.profile?.email_verified || false;

      // console.log("JWT", params);

      // console.log({ trigger, provider, email, isVerified });

      return params.token;
    },

    session(params) {
      // console.log("session", params);

      return params.session;
    },

    signIn(params) {
      console.log("signIn", params);
      return true;
    },
  },

  pages: { signIn: "/login" },
};
