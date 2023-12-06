import SignOutButton from "@/app/components/signout-button";
import SubmitButton from "@/app/components/submit-form-button";
import { auth } from "@/app/auth/config";
import { getUserWithEmail } from "@/app/lib/users";
import { createFakeEvents, deleteFakeEvents } from "@/app/lib/fake-data";


/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default async function Admin() {
    // fetch the session and user
    const session = await auth();
    const user = await getUserWithEmail(session?.user?.email, true);

    const createCompetitions = async () => {
      "use server";
      try {
        const events = await createFakeEvents();
        console.log(`Created ${events.length} events`);
      } catch (e: any) {
        console.warn("error with creating fake competitions", e);
        throw Error(e);
      }
    };
  
    const deleteFakeCompetitions = async () => {
      "use server";
      try {
        const deletedWriteResult = await deleteFakeEvents();
        console.log(`Deleted ${deletedWriteResult.length} events`);
      } catch (e: any) {
        console.warn("error with creating fake competitions", e);
        throw Error(e);
      }
    };

    return (
      <div className="flex-grow mx-auto w-full max-w-lg p-6">
          <div className="mx-auto w-full max-w-lg p-6">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin page
          </h2>
         <form action={createCompetitions}>
            <SubmitButton className="w-full mt-6" loadingText="Creating...">
              Create Fake Competitions
            </SubmitButton>
      </form>
      <SignOutButton className="w-full mt-4" type="button" variant="secondary" email={user?.email} />
      </div>
    </div>
    )
  }