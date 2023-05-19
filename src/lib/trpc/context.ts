import type { RequestEvent } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client/edge";
import type { inferAsyncReturnType } from "@trpc/server";

const prisma = new PrismaClient();

export const createContext = async (event: RequestEvent) => {
  let email: string | null = null;
  const session = event.locals.session;

  if (session) email = session.email;
  return {
    prisma,
    email,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
