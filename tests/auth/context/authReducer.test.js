import { authReducer, types } from "../../../src/auth";

describe("Prueba en AuthReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });
  test("debe de (login) llamar el login autentificar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        id: "ABC123",
        name: "John Doe",
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });
  test("debe de (logout) borrar el name del usuario y logged en false", () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer(
      { logged: true, user: { name: "John Doe" } },
      action
    );
    console.log(state);
    expect(state).toEqual({ logged: false });
  });
});
