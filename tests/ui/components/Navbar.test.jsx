import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en el Navbar", () => {
  const contextValue = {
    logged: true,
    user: {
      id: 123,
      name: "Juan",
    },
    logout: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should mostrar el nombre del usuario logeado", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    screen.debug();
    expect(screen.getByText("Juan")).toBeTruthy();
  });
  test("should de llamar el logout y navigate cuando se hace click   en el boton", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    screen.debug();
    // const logoutButton = screen.getByText("Logout");
    const logoutButton = screen.getByRole("button");
    fireEvent.click(logoutButton);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
