import type { RequestEvent } from "@sveltejs/kit";
import pkg from "@prisma/client/edge";
import type { inferAsyncReturnType } from "@trpc/server";
import { DATABASE_URL } from "$env/static/private";

const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

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
