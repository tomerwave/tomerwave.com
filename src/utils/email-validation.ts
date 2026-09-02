const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

export const isValidEmail = (email: string) => {
  if (email.length > 254 || !EMAIL_SHAPE.test(email)) return false;

  const [local, domain] = email.split("@");
  if (!local || !domain || local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;

  return domain.split(".").every((label) => DOMAIN_LABEL.test(label));
};
