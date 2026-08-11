import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const setConnected = mutation({
  args: {
    isConnected: v.boolean(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return;
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      return;
    }

    await ctx.db.patch(userId, {
      isConnected: args.isConnected,
    });
  },
});
