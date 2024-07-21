import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { requireUserSection } from "../data/auth.server";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "../data/expenses.server";
import { validateExpenseInput } from "../data/validation.server";
import ExpenseFormModal from "../views/wallet-page/expense-form-modal/ExpenseFormModal";

export default function ExpenseItem() {
  return <ExpenseFormModal />;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  await requireUserSection(request);
  const expenseId = params.id;
  const expense = await getExpense(expenseId);

  return expense;
}

export async function action({ params, request }: LoaderFunctionArgs) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    return { deleteId: expenseId };
  }

  if (request.method === "PATCH") {
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/wallet");
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title?.toUpperCase() || "Wallet" },
    { name: "description", content: "Create your wallet now!" },
  ];
};
