import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { auth } from "./middleware/auth";

export const t = initTRPC.context<Context>().create();

export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(auth);
