import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRemedyDetails } from "./useRemedyDetails";

vi.mock("../../../data/db.json", () => ({
  default: [
    {
      id: 1,
      name: "Citron",
      image: "https://example.com/citron.jpg",
      description: "Un agrume",
    },
    {
      id: 2,
      name: "Thé Vert",
      image: "http://example.com/the-vert.jpg",
      description: "Une boisson",
    },
  ],
}));

vi.mock("../../remedy-result-page", () => ({
  getRemedyBySlug: (slug, db) => {
    const slugMap = {
      citron: db[0],
      "the-vert": db[1],
    };
    return slugMap[slug] || null;
  },
}));

describe("useRemedyDetails", () => {
  it("should return remedy when found", () => {
    const { result } = renderHook(() => useRemedyDetails("citron"));

    expect(result.current.remedy).toBeDefined();
    expect(result.current.remedy.name).toBe("Citron");
    expect(result.current.notFound).toBe(false);
  });

  it("should return notFound when remedy not found", () => {
    const { result } = renderHook(() => useRemedyDetails("inexistant"));

    expect(result.current.remedy).toBeNull();
    expect(result.current.notFound).toBe(true);
    expect(result.current.safeImageUrl).toBeNull();
  });

  it("should return safe image URL for valid HTTPS", () => {
    const { result } = renderHook(() => useRemedyDetails("citron"));

    expect(result.current.safeImageUrl).toBe("https://example.com/citron.jpg");
  });

  it("should return placeholder for invalid HTTP URL", () => {
    const { result } = renderHook(() => useRemedyDetails("the-vert"));

    expect(result.current.safeImageUrl).toContain("placeholder");
  });

  it("should memoize remedy based on slug", () => {
    const { result, rerender } = renderHook(
      ({ slug }) => useRemedyDetails(slug),
      {
        initialProps: { slug: "citron" },
      },
    );

    const firstRemedy = result.current.remedy;

    rerender({ slug: "citron" });

    expect(result.current.remedy).toBe(firstRemedy);
  });

  it("should update when slug changes", () => {
    const { result, rerender } = renderHook(
      ({ slug }) => useRemedyDetails(slug),
      {
        initialProps: { slug: "citron" },
      },
    );

    expect(result.current.remedy.name).toBe("Citron");

    rerender({ slug: "the-vert" });

    expect(result.current.remedy.name).toBe("Thé Vert");
  });
});
