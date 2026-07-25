import { describe, expect, it } from "vitest";

import { getSafeInternalPath } from "../../lib/safe-navigation";

describe("getSafeInternalPath", () => {
  it("keeps valid internal destinations", () => {
    expect(getSafeInternalPath("/profile?tab=friends")).toBe(
      "/profile?tab=friends",
    );
  });

  it("rejects protocol-relative external destinations", () => {
    expect(getSafeInternalPath("//example.com/account")).toBe("/dashboard");
  });

  it("rejects absolute and missing destinations", () => {
    expect(getSafeInternalPath("https://example.com")).toBe("/dashboard");
    expect(getSafeInternalPath(null, "/games")).toBe("/games");
  });
});
