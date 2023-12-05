import SignOutButton from "@/app/components/signout-button";
import SubmitButton from "@/app/components/submit-form-button";
import { auth } from "@/app/auth/config";
import { getInvitedUsers, getUserWithEmail, updateInvitedUser, updateUser } from "@/app/lib/users";
import { Text, TextInput } from "@tremor/react";
import { redirect } from "next/navigation";
import { z } from "zod";
import InviteUsers from "@/app/profile/invite";
import { InvitedUser } from "@/types/user";


/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default async function Profile({ searchParams }: { searchParams: { callbackUrl?: string, senderEmail?: string }}) {
    // fetch the session and user
    const session = await auth();
    const user = await getUserWithEmail(session?.user?.email, true);
    
  	/**
     * Define the submitting form action
     *
     * @param {FormData} data
     */
    const createFakeCompetitions = async () => {
      "use server";
      try {
        
      } catch (e: any) {
        console.warn("error with form action", e);
        throw Error(e);
      }
    };

    return (
      <div className="flex-grow mx-auto w-full max-w-lg p-6">
          <div className="mx-auto w-full max-w-lg p-6">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin page
          </h2>
         <form action={createFakeCompetitions}>
            <SubmitButton className="w-full mt-6" loadingText="Creating...">
              Create Fake Competitions
            </SubmitButton>
      </form>
      <SignOutButton className="w-full mt-4" type="button" variant="secondary" email={user?.email} />
      </div>
    </div>
    )
  }