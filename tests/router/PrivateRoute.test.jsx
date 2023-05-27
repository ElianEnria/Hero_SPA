import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("PrivateRoute Test", () => {
  test("debe de mostrarse el Children si esta autentificado", () => {
    Storage.prototype.setItem = jest.fn();
    render(
      <AuthContext.Provider
        value={{ logged: true, user: { id: 123, name: "Juan" } }}
      >
        <MemoryRouter>
          <PrivateRoute>
            <h1>Ruta Privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta Privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
