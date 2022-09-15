import router from "next/router";
import cookie from "js-cookie";

export function handleLogin(token) {
  cookie.set("token", token);
  router.push("/account");
}

export function isAuthenticated() {
  return cookie.get("token");
}