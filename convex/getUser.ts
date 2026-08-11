import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      return null;
    }

    return {
      id: user._id,
      name: user.name ?? null,
      email: user.email ?? null,
      image: user.image ?? null,
      githubId: user.githubId ?? null,
      githubLogin: user.githubLogin ?? null,
      githubUrl: user.githubUrl ?? null,
      isConnected: user.isConnected ?? false,
    };
  },
});
