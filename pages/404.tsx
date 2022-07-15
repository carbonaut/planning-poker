import Router from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname !== "/" && !pathname.includes("/room/")) {
      Router.push("/");
    }
  });
  return;
}
