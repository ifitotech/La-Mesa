export function getSafeInternalPath(
  value: string | null | undefined,
  fallback = "/dashboard",
) {
  if (!value?.startsWith("/") || value.startsWith("//")) return fallback;

  try {
    const parsed = new URL(value, "https://la-mesa.local");
    if (parsed.origin !== "https://la-mesa.local") return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
