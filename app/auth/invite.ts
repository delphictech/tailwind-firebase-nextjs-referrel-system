'use client';

import { User } from "@/types/user";
import { signIn } from "next-auth/react";
import { ExtraEmailOptions } from "@/types/auth";

// function that will create the callback url to the profile screen with the query parameters
const createProfileCallbackUrl = (windowLocationOrigin: string, callbackUrl?: string) => {
    const params = new URLSearchParams();
    if (callbackUrl) {
        params.set('callbackUrl', callbackUrl);
    } else {
        params.delete('callbackUrl');
    };

    return `${windowLocationOrigin}/profile?${params.toString()}`;
};

export /**
 * Function will invite user to the application
 * Will return true or false depending on if an email was sent
 * 
 * @param {string} email
 * @param {string} windowLocationOrigin
 * @param {string} [callbackUrl]
 */
const inviteUser = async (email: string, inviteOptions?: Omit<Omit<Omit<ExtraEmailOptions, "email">, "invite">, "emailType">, sendIfUserExists = true) => {
  // set the default options
  const signInOptions: Omit<Omit<ExtraEmailOptions, "email">, "invite"> = {
    buttonText: "Accept Invite",
    emailSubject: "You have been invited to join Neo",
    emailMessage: "To accept your invite to Neo, click the button below.",
    emailType: 'invite',
    ...inviteOptions,
  }

  try {
    // get the user data avaialable
    const emailParams = new URLSearchParams();
    emailParams.set('email', email);
    const userResponse = await fetch(`/api/get-user?${emailParams.toString()}`);
    const userData: Partial<User | null> = await userResponse.json();

    // if it is a new user, set the referring url in the parameters for the profile screen
    if (!userData) {
      const newCallbackUrl = createProfileCallbackUrl(window.location.origin, inviteOptions?.callbackUrl);
      delete inviteOptions?.callbackUrl;
      await signIn('email', { email, callbackUrl: newCallbackUrl, redirect: false, invite: true, ...signInOptions });
      return true;
    } else if (sendIfUserExists) {
      // return the normal callback url if user already has an account
      await signIn('email', { email, callbackUrl: inviteOptions?.callbackUrl, redirect: false, invite: true, ...signInOptions });
      return true;
    } else {
      // don't send email and just return false
      return false;
    }
  } catch (e: any) {
    throw Error("Error with inviting user", e);
  }
};