import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import { useUserGuard } from "./hooks";
import { useUserGuard } from "@lib/hooks";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const publicPaths = ["/login"];
  const path = router.asPath.split("?")[0];
  const [authorized, setAuthorized] = useState(publicPaths.includes(path));

  useEffect(async () => {
    // on initial load - run auth check
    const authStatus = await authCheck(router.asPath);
    console.log("authStatus", authStatus);
    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(authStatus);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const user = await useUserGuard();
    const publicPaths = ["/login", "/auth/login",];
    const path = url.split("?")[0];
    if (!user.user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath }
      });
      return false;
    } else {
      setAuthorized(true);
      return true;
    }
  }

  return authorized && children;
}
