import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));


describe("Prueba en SearchPage ", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })


  test("Debe de mostrarse correctamente con valores por defectos ", () => {
    const { container } = render(
      // ocupo el use por eso el MemoryRouter
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    screen.debug();
  });

  test("Debe de mostrar a Batman y el input con el valor del queryString ", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const inputValue = screen.getByRole("textbox");
    expect(inputValue.value).toBe("batman");
    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
    screen.debug();
    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("none");
  });

  test("Debe de mostrar un error si no se encuentra el heroe (batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("");
  });
  test("Debe de llamar el navigate a la panlla nueva ", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { name: "searchText", value: "batman" } });
    console.log(input.value);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
