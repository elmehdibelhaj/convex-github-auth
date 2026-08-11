"use client";

import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { GitBranch, LogOut, CircleCheck } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const { signIn } = useAuthActions();

  const handleSignIn = async () => {
    try {
      console.log("Starting GitHub sign-in...");
      await signIn("github");
      console.log("GitHub sign-in finished");
    } catch (error) {
      console.error("GitHub sign-in failed:", error);

      alert(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <main className="min-h-screen p-8 font-sans">
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Convex + GitHub Auth</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Small Convex authentication playground
          </p>
        </header>

        <AuthLoading>
          <div className="rounded-lg border p-6">Loading authentication...</div>
        </AuthLoading>

        <Unauthenticated>
          <div className="rounded-lg border p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Welcome</h2>

              <p className="text-sm text-muted-foreground">
                Sign in with GitHub to see your Convex user data.
              </p>
            </div>

            <Button onClick={handleSignIn} className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Sign in with GitHub
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-gray-400" />
              Not authenticated
            </div>
          </div>
        </Unauthenticated>

        <Authenticated>
          <AuthenticatedContent />
        </Authenticated>
      </div>
    </main>
  );
}

function AuthenticatedContent() {
  const { signOut } = useAuthActions();

  const user = useQuery(api.getUser.getUser);

  const setConnected = useMutation(api.userStatus.setConnected);

  /*
   * As soon as this component appears, the user is authenticated.
   * Tell Convex that this user is connected.
   */
  useEffect(() => {
    setConnected({ isConnected: true }).catch((error) => {
      console.error("Failed to set connected:", error);
    });
  }, [setConnected]);

  const handleSignOut = async () => {
    try {
      /*
       * Set the Convex record to false BEFORE destroying
       * the authentication session.
       */
      await setConnected({ isConnected: false });

      await signOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  if (user === undefined) {
    return <div className="rounded-lg border p-6">Loading user...</div>;
  }

  if (user === null) {
    return (
      <div className="rounded-lg border p-6">
        <p>Authenticated, but no user document was found.</p>
      </div>
    );
  }

  const isConnected = user.isConnected === true;

  return (
    <div className="space-y-6">
      {/* Status card */}
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">Authentication status</h2>

            <p className="text-sm text-muted-foreground">
              Your status is stored in Convex.
            </p>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-2 text-sm font-medium">
              <CircleCheck className="h-4 w-4 text-green-500" />
              <span className="text-green-600">Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
              <span className="text-muted-foreground">Disconnected</span>
            </div>
          )}
        </div>
      </div>

      {/* User card */}
      <div className="rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">GitHub user</h2>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt="GitHub avatar"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border"
            />
          ) : (
            <div className="h-16 w-16 rounded-full border flex items-center justify-center">
              ?
            </div>
          )}

          <div>
            <p className="font-semibold">{user.name || "Unknown user"}</p>

            {user.email && (
              <p className="text-sm text-muted-foreground">{user.email}</p>
            )}

            <div className="mt-1 flex items-center gap-2 text-xs">
              <span
                className={`h-2 w-2 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              <span className="text-muted-foreground">
                {isConnected ? "Authenticated" : "Not connected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Convex data */}
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">Convex user document</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          This data is coming directly from your Convex query.
        </p>

        <pre className="mt-4 overflow-auto rounded-md bg-black/10 p-4 text-xs">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
