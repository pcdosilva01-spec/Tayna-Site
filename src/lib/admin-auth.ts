import { createHmac } from "crypto";
import { cookies } from "next/headers";

const ADMIN_TOKEN_SECRET = process.env.AUTH_SECRET || "fallback-secret-change-me";

/**
 * Generates a secure HMAC token for the admin cookie.
 * Instead of storing "true", we store a signed token that can't be forged.
 */
export function generateAdminToken(): string {
  const payload = `admin:${Date.now()}`;
  const signature = createHmac("sha256", ADMIN_TOKEN_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Validates that an admin token was signed by our server.
 */
export function validateAdminToken(token: string): boolean {
  if (!token || !token.includes(".")) return false;
  
  const lastDotIndex = token.lastIndexOf(".");
  const payload = token.substring(0, lastDotIndex);
  const signature = token.substring(lastDotIndex + 1);
  
  const expectedSignature = createHmac("sha256", ADMIN_TOKEN_SECRET)
    .update(payload)
    .digest("hex");
  
  // Constant-time comparison to prevent timing attacks
  if (signature.length !== expectedSignature.length) return false;
  
  let mismatch = 0;
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  
  return mismatch === 0;
}

/**
 * Checks if the current request has valid admin authentication.
 * Use this at the top of every admin Server Action.
 * Returns true if authorized, false otherwise.
 */
export async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  
  if (!token) return false;
  
  // Support legacy "true" cookie during migration, but also validate new tokens
  if (token === "true") return true; // TODO: remove after all admins re-login
  
  return validateAdminToken(token);
}
