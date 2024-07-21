import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export interface AnalyseChartDataType {
  month: string;
  totalExpense: number;
}

interface AnalyseChartProps {
  data: AnalyseChartDataType[] | undefined;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export default function AnalyseChart({ data: dataRaw }: AnalyseChartProps) {
  const data = {
    labels: dataRaw?.map((data) => data.month),
    datasets: [
      {
        label: "Amount Spent (USD)",
        data: dataRaw?.map((data) => data.totalExpense),
        backgroundColor: "#0090AF",
      },
    ],
  };

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
