import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSymptomSubmit } from "./useSymptomSubmit";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock findMatchingRemedies
vi.mock("../utils/remedyMatcher", () => ({
  findMatchingRemedies: vi.fn((symptoms, _db) => {
    if (symptoms.length === 0) return [];
    if (symptoms.includes("nausée")) {
      return [
        {
          remedy: { id: 0, name: "Citron", type: "plante" },
          matchCount: 1,
          matchedSymptoms: ["nausée"],
        },
      ];
    }
    return [];
  }),
}));

// Mock db.json
vi.mock("../data/db.json", () => ({
  default: [
    {
      id: 0,
      name: "Citron",
      symptoms: ["nausée", "fatigue"],
    },
  ],
}));

describe("useSymptomSubmit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("doit initialiser avec les valeurs par défaut", () => {
    const { result } = renderHook(() => useSymptomSubmit());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.results).toBeNull();
    expect(result.current.hasSubmitted).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("ne doit pas soumettre si aucun symptôme n'est fourni", () => {
    const { result } = renderHook(() => useSymptomSubmit());

    act(() => {
      result.current.handleSubmit([]);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("ne doit pas soumettre si selectedSymptoms est null", () => {
    const { result } = renderHook(() => useSymptomSubmit());

    act(() => {
      result.current.handleSubmit(null);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("doit définir isLoading pendant la soumission", () => {
    const { result } = renderHook(() => useSymptomSubmit());

    act(() => {
      result.current.handleSubmit(["nausée"]);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("doit rechercher les remèdes et naviguer après soumission", async () => {
    const { result } = renderHook(() => useSymptomSubmit());

    act(() => {
      result.current.handleSubmit(["nausée"]);
      // Avancer les timers immédiatement
      vi.runAllTimers();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasSubmitted).toBe(true);
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].remedy.name).toBe("Citron");

    expect(mockNavigate).toHaveBeenCalledWith("/remedes?symptoms=naus%C3%A9e", {
      state: { symptoms: ["nausée"] },
    });
  });

  it("doit naviguer avec les bons symptômes en state", async () => {
    const { result } = renderHook(() => useSymptomSubmit());
    const symptoms = ["nausée", "fatigue"];

    act(() => {
      result.current.handleSubmit(symptoms);
      vi.runAllTimers();
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/remedes?symptoms=naus%C3%A9e%2Cfatigue",
      {
        state: { symptoms },
      },
    );
  });

  it("doit réinitialiser hasSubmitted après 2 secondes", async () => {
    const { result } = renderHook(() => useSymptomSubmit());

    act(() => {
      result.current.handleSubmit(["nausée"]);
      // Avancer le timer de soumission
      vi.advanceTimersByTime(500);
    });

    expect(result.current.hasSubmitted).toBe(true);

    // Avancer le timer de reset (2 secondes)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.hasSubmitted).toBe(false);
  });

  it("doit réinitialiser l'erreur lors d'une nouvelle soumission", async () => {
    const { result } = renderHook(() => useSymptomSubmit());

    // Simuler une erreur initiale
    act(() => {
      result.current.handleSubmit(["symptôme-invalide"]);
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // Nouvelle soumission
    act(() => {
      result.current.handleSubmit(["nausée"]);
    });

    expect(result.current.error).toBeNull();
  });

  it("doit gérer les symptômes multiples", async () => {
    const { result } = renderHook(() => useSymptomSubmit());
    const symptoms = ["nausée", "fatigue", "stress"];

    act(() => {
      result.current.handleSubmit(symptoms);
      vi.runAllTimers();
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/remedes?symptoms=naus%C3%A9e%2Cfatigue%2Cstress",
      {
        state: { symptoms },
      },
    );
  });
});
