// This is a minimal hooks.server.ts file to handle SvelteKit routing

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Just pass the request through to the default resolver
  return await resolve(event);
}; 