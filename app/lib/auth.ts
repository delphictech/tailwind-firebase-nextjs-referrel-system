import NextAuth, { NextAuthConfig } from 'next-auth';
import Email from "next-auth/providers/email";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from '@/app/lib/firebase';
import { getUserWithEmail } from '@/app/lib/users';
import { sendVerificationRequest } from '@/app/lib/email-config';

// http guide: https://authjs.dev/guides/providers/email-http
// smtp guide: https://next-auth.js.org/providers/email
export const AuthOptions = {
  adapter: FirestoreAdapter(firestore),
  secret: process.env.AUTH_SECRET,
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "",
      maxAge: 24 * 60 * 60,
      sendVerificationRequest: sendVerificationRequest,
      options: {},
    },
    // Email({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   sendVerificationRequest: sendVerificationRequest,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],

  // only send magic links to existing users
  // https://next-auth.js.org/providers/email#sending-magic-links-to-existing-users
  // callbacks: {
  //   async signIn({ user }) {
  //     const userExists = await getUserWithEmail(user.email);
  //     // email magic link to existing user, otherwise go to profile screen
  //     return !userExists ? true : "/profile";
  //   },
  // }
} satisfies NextAuthConfig;

const MainAuth = NextAuth(AuthOptions);
export default MainAuth;
const { auth } = MainAuth;
