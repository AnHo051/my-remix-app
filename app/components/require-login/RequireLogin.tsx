import { Link } from "@remix-run/react";
import Button from "../button/Button";

export default function RequireLogin() {
  if (typeof window === "undefined") return null;
  return (
    <div className="my-7 flex min-h-[50vh] w-full items-center justify-center lg:my-10">
      <div className="flex w-4/5 flex-col items-center justify-center gap-5 text-center lg:gap-8">
        <h1 className="text-xl lg:text-3xl">
          You need to be logged in to view this page!
        </h1>
        <Link to={`/auth?mode=login&redirectPath=${window.location.pathname}`}>
          <Button>Login Now!</Button>
        </Link>
      </div>
    </div>
  );
}
