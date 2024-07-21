import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import styles from "./ExpenseForm.module.css";
import Button from "~/components/button/Button";
import { useRef } from "react";
import { ExpenseDataType } from "../expense-item/ExpenseItem";

interface ValidationDataType {
  title?: string;
  amount?: string;
  date?: string;
}

interface ExpenseFormProps {}

export default function ExpenseForm(props: ExpenseFormProps) {
  const validationErrors = useActionData() as ValidationDataType;
  const expenseData = useLoaderData() as ExpenseDataType;
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const formRef = useRef<HTMLFormElement>(null);

  const defaultValues = expenseData
    ? {
        title: expenseData?.title,
        amount: expenseData?.amount,
        date: expenseData?.date?.slice(0, 10),
        note: expenseData?.note,
      }
    : {
        title: "",
        amount: "",
        date: "",
        note: "",
      };

  return (
    <div className="flex w-full max-w-[30rem] flex-col items-center justify-center rounded-xl border-2 border-primary bg-white px-10 py-8">
      <div className="mb-5 text-2xl font-bold text-dark-grey">ADD EXPENSE</div>
      <Form
        ref={formRef}
        className="flex w-full flex-col items-end justify-center"
        method={expenseData ? "patch" : "post"}
      >
        <div className="mb-8 flex w-full flex-col gap-5 text-lg">
          <div className="w-full">
            <div className="w-full">
              <input
                className={styles["input"]}
                type="text"
                required
                id="title"
                name="title"
                placeholder="Enter your expense title"
                minLength={1}
                maxLength={30}
                defaultValue={defaultValues.title}
              />
              {validationErrors?.title && (
                <div className="text-sm font-bold text-red-500">
                  {validationErrors?.title}
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <input
              className={styles["input"]}
              type="number"
              required
              id="amount"
              name="amount"
              min="0"
              step="0.01"
              placeholder="Enter your expense value"
              defaultValue={defaultValues.amount}
            />
            {validationErrors?.amount && (
              <div className="text-sm font-bold text-red-500">
                {validationErrors?.amount}
              </div>
            )}
          </div>
          <div className="w-full">
            <input
              className={styles["input"]}
              type="date"
              required
              max={new Date().toISOString().slice(0, 10)}
              id="date"
              name="date"
              placeholder="Enter your expense date"
              defaultValue={defaultValues.date}
            />
            {validationErrors?.date && (
              <div className="text-sm font-bold text-red-500">
                {validationErrors?.date}
              </div>
            )}
          </div>
          <div className="w-full">
            <input
              className={styles["input"]}
              type="text"
              id="note"
              name="note"
              placeholder="Enter your expense note"
              minLength={1}
              maxLength={50}
              defaultValue={defaultValues.note}
            />
          </div>
        </div>
        <div className="seft-end flex gap-3">
          <Link to="/wallet">
            <Button
              disabled={isSubmitting}
              className={`rounded-xl px-5 py-3 text-xl ${styles["btn-cancel"]}`}
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="rounded-xl px-5 py-3 text-xl">
            {isSubmitting ? "Submiting..." : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
