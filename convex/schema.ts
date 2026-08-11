import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),

    githubId: v.optional(v.string()),
    githubLogin: v.optional(v.string()),
    githubUrl: v.optional(v.string()),

    isConnected: v.optional(v.boolean()),

    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    tokenIdentifier: v.optional(v.string()),
  })
    .index("email", ["email"])
    .index("tokenIdentifier", ["tokenIdentifier"]),
});
