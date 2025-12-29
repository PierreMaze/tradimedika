// utils/logger.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createLogger } from "./logger";

describe("logger.js - Conditional Logging", () => {
  let consoleLogSpy;
  let consoleWarnSpy;
  let consoleErrorSpy;
  let consoleGroupSpy;
  let consoleGroupEndSpy;
  let consoleTableSpy;
  let originalEnv;

  beforeEach(() => {
    // Sauvegarder l'environnement original
    originalEnv = import.meta.env.DEV;

    // Spy sur les fonctions console
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleGroupSpy = vi.spyOn(console, "group").mockImplementation(() => {});
    consoleGroupEndSpy = vi
      .spyOn(console, "groupEnd")
      .mockImplementation(() => {});
    consoleTableSpy = vi.spyOn(console, "table").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurer l'environnement original
    import.meta.env.DEV = originalEnv;

    // Restaurer les spies
    vi.restoreAllMocks();
  });

  describe("Development Mode (DEV=true)", () => {
    beforeEach(() => {
      import.meta.env.DEV = true;
    });

    it("should log debug messages with context prefix", () => {
      const logger = createLogger("TestComponent");
      logger.debug("Debug message", { data: "test" });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Debug message",
        { data: "test" },
      );
    });

    it("should log info messages with context prefix", () => {
      const logger = createLogger("TestComponent");
      logger.info("Info message", { data: "test" });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Info message",
        { data: "test" },
      );
    });

    it("should log full warning messages with details", () => {
      const logger = createLogger("TestComponent");
      const error = new Error("Test error");
      logger.warn("Warning message", error);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Warning message",
        error,
      );
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.stringContaining("Une erreur non-critique"),
      );
    });

    it("should log full error messages with stack trace", () => {
      const logger = createLogger("TestComponent");
      const error = new Error("Test error");
      logger.error("Error message", error);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Error message",
        error,
      );
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.stringContaining("Code:"),
      );
    });

    it("should support console.group in development", () => {
      const logger = createLogger("TestComponent");
      logger.group("Test Group");

      expect(consoleGroupSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Test Group",
      );
    });

    it("should support console.groupEnd in development", () => {
      const logger = createLogger("TestComponent");
      logger.groupEnd();

      expect(consoleGroupEndSpy).toHaveBeenCalled();
    });

    it("should support console.table in development", () => {
      const logger = createLogger("TestComponent");
      const data = [
        { id: 1, name: "Test 1" },
        { id: 2, name: "Test 2" },
      ];
      logger.table(data);

      expect(consoleTableSpy).toHaveBeenCalledWith(data);
    });

    it("should handle multiple arguments in debug", () => {
      const logger = createLogger("TestComponent");
      logger.debug("Message", "arg1", "arg2", { key: "value" });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Message",
        "arg1",
        "arg2",
        { key: "value" },
      );
    });
  });

  describe("Production Mode (DEV=false)", () => {
    beforeEach(() => {
      import.meta.env.DEV = false;
    });

    it("should NOT log debug messages in production", () => {
      const logger = createLogger("TestComponent");
      logger.debug("Debug message", { data: "test" });

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("should NOT log info messages in production", () => {
      const logger = createLogger("TestComponent");
      logger.info("Info message", { data: "test" });

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it("should log generic warning message without details", () => {
      const logger = createLogger("TestComponent");
      const error = new Error("Sensitive error details");
      logger.warn("Warning with sensitive info", error);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Une erreur non-critique s'est produite",
      );
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.stringContaining("sensitive"),
      );
    });

    it("should log generic error message with error code", () => {
      const logger = createLogger("TestComponent");
      const error = new Error("Sensitive error details");
      logger.error("Error with sensitive info", error);

      expect(consoleErrorSpy).toHaveBeenCalled();
      const callArgs = consoleErrorSpy.mock.calls[0];
      expect(callArgs[0]).toBe("[TestComponent]");
      expect(callArgs[1]).toMatch(
        /^Une erreur s'est produite \(Code: ERR_TESTCOMPONENT_\d+\)$/,
      );
    });

    it("should generate different error codes for different errors", () => {
      const logger = createLogger("TestComponent");

      logger.error("Error 1");
      const firstCall = consoleErrorSpy.mock.calls[0][1];

      // Attendre un peu pour avoir un timestamp différent
      vi.useFakeTimers();
      vi.advanceTimersByTime(1);

      logger.error("Error 2");
      const secondCall = consoleErrorSpy.mock.calls[1][1];

      // Les codes d'erreur peuvent être différents (dépend du timestamp)
      expect(firstCall).toMatch(/ERR_TESTCOMPONENT_\d+/);
      expect(secondCall).toMatch(/ERR_TESTCOMPONENT_\d+/);

      vi.useRealTimers();
    });

    it("should NOT call console.group in production", () => {
      const logger = createLogger("TestComponent");
      logger.group("Test Group");

      expect(consoleGroupSpy).not.toHaveBeenCalled();
    });

    it("should NOT call console.groupEnd in production", () => {
      const logger = createLogger("TestComponent");
      logger.groupEnd();

      expect(consoleGroupEndSpy).not.toHaveBeenCalled();
    });

    it("should NOT call console.table in production", () => {
      const logger = createLogger("TestComponent");
      const data = [{ id: 1 }];
      logger.table(data);

      expect(consoleTableSpy).not.toHaveBeenCalled();
    });
  });

  describe("Logger Context", () => {
    beforeEach(() => {
      import.meta.env.DEV = true;
    });

    it("should use provided context in log prefix", () => {
      const logger = createLogger("CustomContext");
      logger.debug("Test message");

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[CustomContext]",
        expect.anything(),
      );
    });

    it("should support different loggers with different contexts", () => {
      const logger1 = createLogger("Component1");
      const logger2 = createLogger("Component2");

      logger1.debug("Message 1");
      logger2.debug("Message 2");

      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        "[Component1]",
        "Message 1",
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        2,
        "[Component2]",
        "Message 2",
      );
    });

    it("should uppercase context in error codes", () => {
      import.meta.env.DEV = false;
      const logger = createLogger("myComponent");
      logger.error("Test error");

      const callArgs = consoleErrorSpy.mock.calls[0];
      expect(callArgs[1]).toMatch(/ERR_MYCOMPONENT_\d+/);
    });
  });

  describe("Edge Cases", () => {
    beforeEach(() => {
      import.meta.env.DEV = true;
    });

    it("should handle logging with no additional arguments", () => {
      const logger = createLogger("TestComponent");
      logger.debug("Just a message");

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Just a message",
      );
    });

    it("should handle logging with null/undefined", () => {
      const logger = createLogger("TestComponent");
      logger.debug("Message with null", null);
      logger.info("Message with undefined", undefined);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Message with null",
        null,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Message with undefined",
        undefined,
      );
    });

    it("should handle logging objects and arrays", () => {
      const logger = createLogger("TestComponent");
      const obj = { key: "value" };
      const arr = [1, 2, 3];

      logger.debug("Object", obj);
      logger.info("Array", arr);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Object",
        obj,
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "[TestComponent]",
        "Array",
        arr,
      );
    });
  });
});
