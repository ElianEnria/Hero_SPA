import { types } from "../../../src/auth";

describe("Pruebas en Types", () => {
  test("should Regresar Estos Types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
