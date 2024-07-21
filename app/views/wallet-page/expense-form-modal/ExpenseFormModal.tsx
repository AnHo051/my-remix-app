import ExpenseForm from "../expense-form/ExpenseForm";

export default function ExpenseFormModal() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-end bg-black bg-opacity-50">
      <div className="flex w-full flex-col items-center justify-center">
        <ExpenseForm />
      </div>
    </div>
  );
}
