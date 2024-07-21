import Button from "~/components/button/Button";
import ExpenseItem, { ExpenseDataType } from "./expense-item/ExpenseItem";
import { Link, useLoaderData } from "@remix-run/react";
import RequireLogin from "~/components/require-login/RequireLogin";

interface WalletPageDataType {
  expenses: ExpenseDataType[];
  userId?: string;
}

export default function WalletPage() {
  const data = useLoaderData() as WalletPageDataType;

  if (!data?.userId) return <RequireLogin />;

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-11/12 max-w-6xl flex-col items-center justify-center gap-8 py-10">
        <Link to="/wallet/add" className="self-end">
          <Button>Add Expense</Button>
        </Link>
        {data?.expenses.length < 1 ? (
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold uppercase">
              No expenses found
            </h1>
            <p className="text-lg">
              Click on the button above to add a new expense.
            </p>
          </div>
        ) : (
          <div className="grid w-full auto-rows-fr grid-cols-1 content-between justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {data?.expenses?.map((item, index) => (
              <ExpenseItem data={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
