import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en PublicRoute", () => {
  test("debe de mostrarse el Children si no esta autentificado", () => {
    render(
      <AuthContext.Provider value={{ logged: false }}>
        <PublicRoute />
        <h1>Ruta Publica</h1>
        <PublicRoute />
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta Publica")).toBeTruthy();
    // screen.debug();
  });
  test("debe de mostrarse el Children si esta autentificado", () => {
    render(
      <AuthContext.Provider
        value={{ logged: true, user: { id: 123, name: "Juan" } }}
      >
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta Publica</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>PAGINA MARVEL</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("PAGINA MARVEL")).toBeTruthy();
    screen.debug();
  });
});
