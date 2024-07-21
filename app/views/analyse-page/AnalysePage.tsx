import { useFetcher, useLoaderData } from "@remix-run/react";
import AnalyseChart, {
  AnalyseChartDataType,
} from "./analyse-chart/AnalyseChart";
import { useState } from "react";
import RequireLogin from "../../components/require-login/RequireLogin";

interface AnalysePageDataType {
  expenses: AnalyseChartDataType[];
  userId?: string;
}

export default function AnalysePage() {
  const data = useLoaderData<AnalysePageDataType>();
  const fetcher = useFetcher<AnalysePageDataType>();
  const [year, setYear] = useState(new Date().getFullYear().toString());

  if (!data?.userId) return <RequireLogin />;

  if (fetcher.state !== "idle")
    return (
      <div className="flex min-h-dvh items-center justify-center">
        Loading...
      </div>
    );

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const listYear = Array.from({ length: 4 }, (_, i) => currentYear - i);

  const onSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    if (!year) return;
    setYear(year);
    fetcher.load(`/analyse?year=${year}`);
  };

  const expenses = fetcher?.data?.expenses
    ? fetcher?.data?.expenses
    : data?.expenses;

  return (
    <div className="flex min-h-[50dvh] w-full flex-col items-center justify-start py-8 lg:min-h-[80dvh]">
      <div className="mb-7 flex flex-col items-center justify-center gap-6 px-10 lg:mb-12 lg:gap-8">
        <div className="text-center text-2xl font-bold lg:text-4xl">
          Annual Expense Overview (Amounts in USD)
        </div>
        <div className="flex items-center justify-center gap-2 text-lg lg:text-2xl">
          <div>YEAR:</div>
          <select
            id="year"
            onChange={(e) => onSelectYear(e)}
            value={year}
            className="rounded-lg border-2 border-primary px-2 py-1 outline-none"
          >
            {listYear.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        {expenses?.length > 0 ? (
          <AnalyseChart data={expenses} />
        ) : (
          <div className="mt-10 rounded-md border-2 border-primary px-10 py-8 text-center">
            <div className="text-3xl font-bold">OOPS!!!</div>
            <div className="text-xl">No data found</div>
          </div>
        )}
      </div>
    </div>
  );
}
