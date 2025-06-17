// src/utils/env.ts

/**
 * Utility function to retrieve environment variables.
 * Throws an error if the variable is not defined.
 * @param name - The name of the environment variable to retrieve.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is not defined.
 */
export function getEnv(name: string): string {
  const value = import.meta.env[name as keyof ImportMetaEnv];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
}
