const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "sa-ten.vercel.app";

export const siteUrl = configuredUrl.startsWith("http")
  ? configuredUrl.replace(/\/$/, "")
  : `https://${configuredUrl.replace(/\/$/, "")}`;
