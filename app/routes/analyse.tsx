import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";
import { getYearExpense } from "../data/expenses.server";
import AnalysePage from "../views/analyse-page/AnalysePage";

export default function Index() {
  return <AnalysePage />;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserFromSession(request);
  const searchParams = new URL(request.url).searchParams;
  const year = searchParams.get("year") || new Date().getFullYear().toString();
  const expenses = await getYearExpense(parseInt(year), userId);
  return { expenses, userId };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Analyse" },
    { name: "description", content: "Welcome to Remix Expense!" },
  ];
};
