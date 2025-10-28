import { ChangePasswordForm } from "@/components/change-password-form";
import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/UpdateUserForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");
  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headersList,
    body: {
      userId: session.user.id,
      permission: { posts: ["update", "delete"] },
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/" label="Home " />

        <h1 className="text-3xl font-bold">Profile</h1>

        <SignOutButton />
        <h2 className="text-2xl font-bold">Permissions</h2>

        <div className="space-x-4">
          <Button size="sm">MANAGE OWN POSTS</Button>
          <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
            MANAGE ALL POSTS
          </Button>
        </div>
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt="User Image"
            className="size-32 border border-primary rounded-md object-cover"
          />
        ) : (
          <div className="size-32 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
            <span className="uppercase text-lg font-bold">
              {session.user.name.slice(0, 2)}
            </span>
          </div>
        )}

        <pre className="text-sm overflow-clip">
          {JSON.stringify(session, null, 2)}
        </pre>

        <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-blue-600">
          <h2 className="text-2xl font-bold">Update User</h2>

          <UpdateUserForm
            name={session.user.name}
            image={session.user.image ?? ""}
          />
        </div>

        <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-red-600">
          <h2 className="text-2xl font-bold">Change Password</h2>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
