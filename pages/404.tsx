import Router from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const { pathname } = Router;
    const roomPathMatch = pathname.match(/[/room/(.+)]/g);

    if (roomPathMatch) {
      Router.push(pathname);
      return;
    }

    if (pathname !== "/" && !pathname.includes("/room/")) {
      Router.push("/");
    }
  });
  return;
}
