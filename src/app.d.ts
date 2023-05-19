// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { CreateCaller } from "$lib/trpc/router";

declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      session: Session | null;
      trpcCaller: CreateCaller | null;
    }
  }
}

class Session {
  email: string;
}

export {};
