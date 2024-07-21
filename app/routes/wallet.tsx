import WalletPage from "../views/wallet-page/WalletPage";
import { getExpenses } from "../data/expenses.server";
import { Outlet } from "@remix-run/react";
import { getUserFromSession } from "../data/auth.server";
import {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";

export default function Index() {
  return (
    <>
      <Outlet />
      <main>
        <WalletPage />
      </main>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserFromSession(request);
  const expenses = userId ? await getExpenses(userId) : [];

  return json(
    { expenses: expenses, userId: userId },
    { headers: { "Cache-Control": "max-age=3" } },
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Wallet" },
    { name: "description", content: "Create your wallet now!" },
  ];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") || "max-age=3600",
});
