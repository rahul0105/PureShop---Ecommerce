// auth.test.js
import { authenticateUser } from "./auth";

describe("User Authentication", () => {
  it("should return true for valid username and password", () => {
    const result = authenticateUser("testUser", "securePassword");
    expect(result).toBe(true);
  });

  it("should return false for invalid username", () => {
    const result = authenticateUser("invalidUser", "securePassword");
    expect(result).toBe(false);
  });

  it("should return false for invalid password", () => {
    const result = authenticateUser("testUser", "wrongPassword");
    expect(result).toBe(false);
  });

  it("should throw an error if username is missing", () => {
    expect(() => authenticateUser(undefined, "securePassword")).toThrow(
      "Username and password are required"
    );
  });

  it("should throw an error if password is missing", () => {
    expect(() => authenticateUser("testUser", undefined)).toThrow(
      "Username and password are required"
    );
  });
});
