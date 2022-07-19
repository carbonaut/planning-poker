import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const { pathname, asPath, isReady } = router;
    const roomPathMatch = pathname.match(/[/room/[id]]/g);

    if (roomPathMatch && isReady) {
      Router.push(asPath);
      return;
    }

    if (isReady) {
      Router.push("/");
    }

    return;
  }, [router]);
}
