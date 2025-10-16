import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normalizeName, VALID_DOMAINS } from "./utils";
import { UserRole } from "./generated/prisma";
import { admin } from "better-auth/plugins";
import { ac, roles } from "./permittions";
import { sendEmailAction } from "@/actions/send-email.action";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000", // Add this
  basePath: "/api/auth",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");
      // console.log("📧 Sending verification email to:", user.email);
      // console.log("🔗 Verification URL:", link);

      // const result =
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(link.href),
        },
      });
      // console.log("✅ Email send result:", result);
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        if (!VALID_DOMAINS().includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain. Please use a valid email.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.split(";") ?? [];
          if (ADMIN_EMAIL.includes(user.email)) {
            return { data: { ...user, role: "ADMIN" } };
          }
          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: UserRole.ADMIN,
      ac,
      roles,
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
