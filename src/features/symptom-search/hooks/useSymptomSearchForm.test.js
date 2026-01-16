import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSymptomSearchForm } from "./useSymptomSearchForm";
import * as UseSymptomTags from "./useSymptomTags";
import * as UseSymptomSubmit from "./useSymptomSubmit";
import * as UseSearchHistory from "../../history-search/hooks/useSearchHistory";
import * as UseAllergies from "../../allergens-search/context/AllergiesContext";

describe("useSymptomSearchForm", () => {
  let mockAddSymptom;
  let mockRemoveSymptom;
  let mockSetSelectedSymptoms;
  let mockAddSearch;
  let mockRemoveSearch;
  let mockClearHistory;
  let mockSetAllergies;
  let mockEnableFiltering;
  let mockDisableFiltering;
  let mockHandleSubmit;

  beforeEach(() => {
    mockAddSymptom = vi.fn();
    mockRemoveSymptom = vi.fn();
    mockSetSelectedSymptoms = vi.fn();
    mockAddSearch = vi.fn();
    mockRemoveSearch = vi.fn();
    mockClearHistory = vi.fn();
    mockSetAllergies = vi.fn();
    mockEnableFiltering = vi.fn();
    mockDisableFiltering = vi.fn();
    mockHandleSubmit = vi.fn();

    vi.spyOn(UseSymptomTags, "useSymptomTags").mockReturnValue({
      selectedSymptoms: ["fatigue"],
      addSymptom: mockAddSymptom,
      removeSymptom: mockRemoveSymptom,
      setSelectedSymptoms: mockSetSelectedSymptoms,
      isAtLimit: false,
    });

    vi.spyOn(UseSearchHistory, "useSearchHistory").mockReturnValue({
      history: [],
      addSearch: mockAddSearch,
      removeSearch: mockRemoveSearch,
      clearHistory: mockClearHistory,
    });

    vi.spyOn(UseAllergies, "useAllergies").mockReturnValue({
      userAllergies: [],
      setAllergies: mockSetAllergies,
      isFilteringEnabled: false,
      enableFiltering: mockEnableFiltering,
      disableFiltering: mockDisableFiltering,
    });

    vi.spyOn(UseSymptomSubmit, "useSymptomSubmit").mockReturnValue({
      handleSubmit: mockHandleSubmit,
      isLoading: false,
      results: [],
      hasSubmitted: false,
    });
  });

  describe("Initial state", () => {
    it("should return values from all sub-hooks", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      expect(result.current.selectedSymptoms).toEqual(["fatigue"]);
      expect(result.current.addSymptom).toBe(mockAddSymptom);
      expect(result.current.removeSymptom).toBe(mockRemoveSymptom);
      expect(result.current.setSelectedSymptoms).toBe(mockSetSelectedSymptoms);
      expect(result.current.history).toEqual([]);
      expect(result.current.addSearch).toBe(mockAddSearch);
      expect(result.current.removeSearch).toBe(mockRemoveSearch);
      expect(result.current.clearHistory).toBe(mockClearHistory);
      expect(result.current.userAllergies).toEqual([]);
      expect(result.current.setAllergies).toBe(mockSetAllergies);
      expect(result.current.isFilteringEnabled).toBe(false);
      expect(result.current.enableFiltering).toBe(mockEnableFiltering);
      expect(result.current.disableFiltering).toBe(mockDisableFiltering);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.results).toEqual([]);
      expect(result.current.hasSubmitted).toBe(false);
    });

    it("should initialize local state correctly", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      expect(result.current.isHistoryOpen).toBe(false);
      expect(result.current.isAllergySectionExpanded).toBe(false);
    });

    it("should provide functions", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      expect(typeof result.current.onSubmit).toBe("function");
      expect(typeof result.current.handleSearchSelect).toBe("function");
      expect(typeof result.current.handleCloseHistory).toBe("function");
      expect(typeof result.current.handleFilteringChange).toBe("function");
      expect(typeof result.current.setIsHistoryOpen).toBe("function");
      expect(typeof result.current.setIsAllergySectionExpanded).toBe(
        "function",
      );
    });
  });

  describe("onSubmit", () => {
    it("should call handleSubmit with current symptoms, allergies and filtering state", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.onSubmit();
      });

      expect(mockHandleSubmit).toHaveBeenCalledWith(["fatigue"], [], false);
    });

    it("should call handleSubmit with allergies when filtering is enabled", () => {
      vi.spyOn(UseAllergies, "useAllergies").mockReturnValue({
        userAllergies: ["pollen", "citrus"],
        setAllergies: mockSetAllergies,
        isFilteringEnabled: true,
        enableFiltering: mockEnableFiltering,
        disableFiltering: mockDisableFiltering,
      });

      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.onSubmit();
      });

      expect(mockHandleSubmit).toHaveBeenCalledWith(
        ["fatigue"],
        ["pollen", "citrus"],
        true,
      );
    });

    it("should call handleSubmit with multiple symptoms", () => {
      vi.spyOn(UseSymptomTags, "useSymptomTags").mockReturnValue({
        selectedSymptoms: ["fatigue", "stress", "insomnie"],
        addSymptom: mockAddSymptom,
        removeSymptom: mockRemoveSymptom,
        setSelectedSymptoms: mockSetSelectedSymptoms,
        isAtLimit: false,
      });

      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.onSubmit();
      });

      expect(mockHandleSubmit).toHaveBeenCalledWith(
        ["fatigue", "stress", "insomnie"],
        [],
        false,
      );
    });
  });

  describe("handleSearchSelect", () => {
    it("should restore symptoms from history search", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      const historySearch = {
        id: "123",
        symptoms: ["stress", "insomnie"],
        allergies: [],
        timestamp: 1234567890,
        resultCount: 5,
      };

      act(() => {
        result.current.handleSearchSelect(historySearch);
      });

      expect(mockSetSelectedSymptoms).toHaveBeenCalledWith([
        "stress",
        "insomnie",
      ]);
      expect(mockSetAllergies).toHaveBeenCalledWith([]);
      expect(mockHandleSubmit).toHaveBeenCalledWith(
        ["stress", "insomnie"],
        [],
        false,
      );
    });

    it("should restore allergies from history search", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      const historySearch = {
        id: "456",
        symptoms: ["fatigue"],
        allergies: ["pollen", "citrus"],
        timestamp: 1234567890,
        resultCount: 3,
      };

      act(() => {
        result.current.handleSearchSelect(historySearch);
      });

      expect(mockSetAllergies).toHaveBeenCalledWith(["pollen", "citrus"]);
      expect(mockEnableFiltering).toHaveBeenCalled();
      expect(mockHandleSubmit).toHaveBeenCalledWith(
        ["fatigue"],
        ["pollen", "citrus"],
        true,
      );
    });

    it("should handle history search without allergies (backward compatibility)", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      const historySearch = {
        id: "789",
        symptoms: ["fièvre", "toux"],
        timestamp: 1234567890,
        resultCount: 2,
      };

      act(() => {
        result.current.handleSearchSelect(historySearch);
      });

      expect(mockSetSelectedSymptoms).toHaveBeenCalledWith(["fièvre", "toux"]);
      expect(mockSetAllergies).toHaveBeenCalledWith([]);
      expect(mockHandleSubmit).toHaveBeenCalledWith(
        ["fièvre", "toux"],
        [],
        false,
      );
    });

    it("should not enable filtering if allergies array is empty", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      const historySearch = {
        id: "999",
        symptoms: ["migraine"],
        allergies: [],
        timestamp: 1234567890,
        resultCount: 1,
      };

      act(() => {
        result.current.handleSearchSelect(historySearch);
      });

      expect(mockEnableFiltering).not.toHaveBeenCalled();
      expect(mockHandleSubmit).toHaveBeenCalledWith(["migraine"], [], false);
    });
  });

  describe("handleCloseHistory", () => {
    it("should close history modal", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.setIsHistoryOpen(true);
      });

      expect(result.current.isHistoryOpen).toBe(true);

      act(() => {
        result.current.handleCloseHistory();
      });

      expect(result.current.isHistoryOpen).toBe(false);
    });
  });

  describe("handleFilteringChange", () => {
    it("should enable filtering when checkbox is checked", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.handleFilteringChange(true);
      });

      expect(mockEnableFiltering).toHaveBeenCalled();
      expect(mockDisableFiltering).not.toHaveBeenCalled();
    });

    it("should disable filtering when checkbox is unchecked", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.handleFilteringChange(false);
      });

      expect(mockDisableFiltering).toHaveBeenCalled();
      expect(mockEnableFiltering).not.toHaveBeenCalled();
    });

    it("should handle multiple filtering toggles", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      act(() => {
        result.current.handleFilteringChange(true);
      });

      expect(mockEnableFiltering).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.handleFilteringChange(false);
      });

      expect(mockDisableFiltering).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.handleFilteringChange(true);
      });

      expect(mockEnableFiltering).toHaveBeenCalledTimes(2);
    });
  });

  describe("Modal state management", () => {
    it("should toggle history modal", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      expect(result.current.isHistoryOpen).toBe(false);

      act(() => {
        result.current.setIsHistoryOpen(true);
      });

      expect(result.current.isHistoryOpen).toBe(true);

      act(() => {
        result.current.setIsHistoryOpen(false);
      });

      expect(result.current.isHistoryOpen).toBe(false);
    });

    it("should toggle allergy section expansion", () => {
      const { result } = renderHook(() => useSymptomSearchForm());

      expect(result.current.isAllergySectionExpanded).toBe(false);

      act(() => {
        result.current.setIsAllergySectionExpanded(true);
      });

      expect(result.current.isAllergySectionExpanded).toBe(true);

      act(() => {
        result.current.setIsAllergySectionExpanded(false);
      });

      expect(result.current.isAllergySectionExpanded).toBe(false);
    });
  });

  describe("Integration with sub-hooks", () => {
    it("should reflect changes in symptoms from useSymptomTags", () => {
      const { result, rerender } = renderHook(() => useSymptomSearchForm());

      expect(result.current.selectedSymptoms).toEqual(["fatigue"]);

      vi.spyOn(UseSymptomTags, "useSymptomTags").mockReturnValue({
        selectedSymptoms: ["fatigue", "stress"],
        addSymptom: mockAddSymptom,
        removeSymptom: mockRemoveSymptom,
        setSelectedSymptoms: mockSetSelectedSymptoms,
        isAtLimit: false,
      });

      rerender();

      expect(result.current.selectedSymptoms).toEqual(["fatigue", "stress"]);
    });

    it("should reflect changes in loading state from useSymptomSubmit", () => {
      const { result, rerender } = renderHook(() => useSymptomSearchForm());

      expect(result.current.isLoading).toBe(false);

      vi.spyOn(UseSymptomSubmit, "useSymptomSubmit").mockReturnValue({
        handleSubmit: mockHandleSubmit,
        isLoading: true,
        results: [],
        hasSubmitted: false,
      });

      rerender();

      expect(result.current.isLoading).toBe(true);
    });

    it("should reflect changes in results from useSymptomSubmit", () => {
      const { result, rerender } = renderHook(() => useSymptomSearchForm());

      expect(result.current.results).toEqual([]);
      expect(result.current.hasSubmitted).toBe(false);

      const mockResults = [
        { id: 1, name: "Remède 1" },
        { id: 2, name: "Remède 2" },
      ];

      vi.spyOn(UseSymptomSubmit, "useSymptomSubmit").mockReturnValue({
        handleSubmit: mockHandleSubmit,
        isLoading: false,
        results: mockResults,
        hasSubmitted: true,
      });

      rerender();

      expect(result.current.results).toEqual(mockResults);
      expect(result.current.hasSubmitted).toBe(true);
    });

    it("should reflect changes in history from useSearchHistory", () => {
      const { result, rerender } = renderHook(() => useSymptomSearchForm());

      expect(result.current.history).toEqual([]);

      const mockHistory = [
        {
          id: "1",
          symptoms: ["fatigue"],
          allergies: [],
          timestamp: 1234567890,
          resultCount: 5,
        },
        {
          id: "2",
          symptoms: ["stress"],
          allergies: ["pollen"],
          timestamp: 1234567891,
          resultCount: 3,
        },
      ];

      vi.spyOn(UseSearchHistory, "useSearchHistory").mockReturnValue({
        history: mockHistory,
        addSearch: mockAddSearch,
        removeSearch: mockRemoveSearch,
        clearHistory: mockClearHistory,
      });

      rerender();

      expect(result.current.history).toEqual(mockHistory);
    });

    it("should reflect changes in allergies from useAllergies", () => {
      const { result, rerender } = renderHook(() => useSymptomSearchForm());

      expect(result.current.userAllergies).toEqual([]);
      expect(result.current.isFilteringEnabled).toBe(false);

      vi.spyOn(UseAllergies, "useAllergies").mockReturnValue({
        userAllergies: ["pollen", "citrus"],
        setAllergies: mockSetAllergies,
        isFilteringEnabled: true,
        enableFiltering: mockEnableFiltering,
        disableFiltering: mockDisableFiltering,
      });

      rerender();

      expect(result.current.userAllergies).toEqual(["pollen", "citrus"]);
      expect(result.current.isFilteringEnabled).toBe(true);
    });
  });

  describe("Callback stability", () => {
    it("should maintain stable callback references", () => {
      const { result, rerender } = renderHook(() => useSymptomSearchForm());

      const onSubmitRef = result.current.onSubmit;
      const handleSearchSelectRef = result.current.handleSearchSelect;
      const handleCloseHistoryRef = result.current.handleCloseHistory;
      const handleFilteringChangeRef = result.current.handleFilteringChange;

      rerender();

      expect(result.current.onSubmit).toBe(onSubmitRef);
      expect(result.current.handleSearchSelect).toBe(handleSearchSelectRef);
      expect(result.current.handleCloseHistory).toBe(handleCloseHistoryRef);
      expect(result.current.handleFilteringChange).toBe(
        handleFilteringChangeRef,
      );
    });
  });
});
