import { Link, useFetcher } from "@remix-run/react";
import Button from "~/components/button/Button";
import BinIcon from "~/images/bin.svg";
import PencilIcon from "~/images/pencil.svg";

export interface ExpenseDataType {
  id: string;
  title: string;
  amount: number;
  note?: string;
  date: string;
}

interface ExpensePropsDataType {
  data: ExpenseDataType;
}

export default function ExpenseItem({ data }: ExpensePropsDataType) {
  const date = new Date(data?.date).toLocaleDateString();
  const fetcher = useFetcher();

  const handleDeleteExpense = () => {
    const proceed = confirm("Are you sure you want to delete this expense?");

    if (!proceed) return;

    fetcher.submit(null, { method: "delete", action: `/wallet/${data.id}` });
  };

  return (
    <div className="h-full w-full min-w-80 max-w-md rounded-3xl border-2 border-primary pb-6 pl-6 pr-2 pt-2">
      <div className="mb-2 flex items-center justify-end gap-2">
        <Button className="rounded-md p-2.5" onClick={handleDeleteExpense}>
          <img src={BinIcon} alt="bin icon" className="h-auto w-4" />
        </Button>
        <Link to={`/wallet/${data.id}`}>
          <Button className="rounded-md p-2.5">
            <img src={PencilIcon} alt="bin icon" className="h-auto w-4" />
          </Button>
        </Link>
      </div>
      <div className="mb-2 text-center text-2xl font-bold capitalize text-primary">
        {data?.title}
      </div>
      <div className="flex flex-col gap-1 text-lg text-dark-grey">
        <div>
          <span className="mr-1 font-bold">Amount:</span> ${data?.amount}
        </div>
        <div>
          <span className="mr-1 font-bold">Date:</span> {date}
        </div>
        {data?.note && (
          <div className="line-clamp-2 leading-tight">
            <span className="mr-1 font-bold">Note:</span>
            {data.note}
          </div>
        )}
      </div>
    </div>
  );
}
