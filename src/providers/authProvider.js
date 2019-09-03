import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  fetchUtils
} from "react-admin"; // eslint-disable-line import/no-unresolved
import { AppConstant } from "./constants";

// Authenticatd by default
export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const { fetchJson } = fetchUtils;
    const urlLogin = `${AppConstant.API_URL}/users/login`;
    const bodyRequest = { email: username, password: password };
    const options = { method: "POST", body: JSON.stringify(bodyRequest) };
    return fetchJson(urlLogin, options)
      .then(response => {
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", response.json.token);
        localStorage.removeItem("not_authenticated");
        return Promise.resolve();
      })
      .catch(err => {
        localStorage.setItem("not_authenticated", true);
        return Promise.reject();
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.setItem("not_authenticated", true);
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.setItem("not_authenticated", true);
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("not_authenticated")
      ? Promise.reject()
      : Promise.resolve();
  }

  return Promise.reject("Unknown method");
};
