// // types/next-auth.d.ts
// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// // import { Role } from "@prisma/client";
// import { Role } from "@/lib/generated/prisma";

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     accessToken?: string;
//     user?: {
//       id: string;
//       role: Role;
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     role: Role;
//   }
// }



// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "@/lib/generated/prisma"; // Correct import path

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}