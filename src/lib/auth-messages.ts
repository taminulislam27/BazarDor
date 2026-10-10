interface AuthError {
  code?: string;
  message?: string;
}

/** Turns BetterAuth's English error codes into friendly Bengali messages. */
export function authErrorMessage(error: AuthError, fallback: string): string {
  const code = error.code ?? "";

  if (code.includes("INVALID_EMAIL_OR_PASSWORD")) return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  if (code.includes("USER_ALREADY_EXISTS")) return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।";
  if (code.includes("PASSWORD_TOO_SHORT")) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (code.includes("PASSWORD_TOO_LONG")) return "পাসওয়ার্ডটি অনেক বড়।";
  if (code.includes("INVALID_EMAIL")) return "সঠিক ইমেইল ঠিকানা দিন।";
  if (code.includes("PROVIDER_NOT_FOUND")) return "এই সোশ্যাল লগইনটি এখনো চালু করা হয়নি।";

  return fallback;
}

export const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
