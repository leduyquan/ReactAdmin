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
  console.log("authProvider");
  if (type === AUTH_LOGIN) {
    console.log("AUTH_LOGIN");
    const { username, password } = params;
    const { fetchJson } = fetchUtils;
    const urlLogin = `${AppConstant.API_URL}/users/login`;
    const bodyRequest = { email: username, password: password };
    const options = { method: "POST", body: JSON.stringify(bodyRequest) };
    return fetchJson(urlLogin, options).then(response => {
      console.log("response", response);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      localStorage.setItem("token", response.json.token);
      localStorage.setItem("role", "admin");
      return response.json.token;
    });
  }
  if (type === AUTH_LOGOUT) {
    console.log("AUTH_LOGOUT");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    console.log("AUTH_ERROR");
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject({ redirectTo: "/login" });
    } else {
      return Promise.resolve();
    }
  }
  if (type === AUTH_CHECK) {
    console.log("AUTH_CHECK");
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token === null) {
      return Promise.reject({ redirectTo: "/login" });
    }

    if (token === undefined) {
      return Promise.reject({ redirectTo: "/login" });
    }

    if (token === "") {
      return Promise.reject({ redirectTo: "/login" });
    }

    return Promise.resolve();
  }

  console.log("authProvider ent with resolve");
  return Promise.resolve();
};
