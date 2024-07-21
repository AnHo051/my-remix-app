import type {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";
import HomePage from "../views/home-page/HomePage";

export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" },
    { name: "description", content: "Welcome to Remix Expense!" },
  ];
};

export default function Index() {
  return <HomePage />;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserFromSession(request);

  return { userId };
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=3600",
});
