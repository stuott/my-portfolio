import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Dropdown } from "components/common";
import Button from "components/common/Button";
import NumberInput from "components/common/NumberInput";
import Section from "components/layout/Section";
import { useState } from "react";
import { Line } from "react-chartjs-2";

const InterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [termLength, setTermLength] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [accrualPeriod, setAccrualPeriod] = useState("monthly");
  const [finalAmount, setFinalAmount] = useState(0);
  const [investmentData, setInvestmentData] = useState<number[]>([]);
  const [interestData, setInterestData] = useState<number[]>([]);
  const [totalValueData, setTotalValueData] = useState<number[]>([]);
  const [periodicInvestment, setPeriodicInvestment] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.font.size = 16;

  const handleInitialInvestmentChange = (value: number) => {
    setInitialInvestment(value);
  };

  const handleTermLengthChange = (value: number) => {
    setTermLength(value);
  };

  const handleInterestRateChange = (value: number) => {
    setInterestRate(value);
  };

  const handleAccrualPeriodChange = (newPeriod: string) => {
    setAccrualPeriod(newPeriod);
  };

  const handlePeriodicInvestmentChange = (value: number) => {
    setPeriodicInvestment(value);
  };

  const calculateFinalAmount = () => {
    if (initialInvestment <= 0 || termLength <= 0 || interestRate <= 0) {
      return;
    }
    const periodsPerYear = accrualPeriod === "monthly" ? 12 : 4;
    const ratePerPeriod = interestRate / 100 / periodsPerYear;
    const totalPeriods = termLength * periodsPerYear;
    const investment = [];
    const interest = [];
    const totalValue = [];
    let currentAmount = initialInvestment;
    let totalInvestedAmount = initialInvestment;
    let totalInterestAmount = 0;

    for (let i = 0; i < totalPeriods; i++) {
      investment.push(initialInvestment + periodicInvestment * i);
      totalInterestAmount += currentAmount * ratePerPeriod;
      interest.push(currentAmount * ratePerPeriod);
      totalValue.push(currentAmount);
      currentAmount =
        (currentAmount + periodicInvestment) * (1 + ratePerPeriod);
      totalInvestedAmount += periodicInvestment;
    }

    setInvestmentData(investment);
    setInterestData(interest);
    setTotalValueData(totalValue);
    setFinalAmount(currentAmount);
    setTotalInvested(totalInvestedAmount);
    setTotalInterest(totalInterestAmount);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Section title="Interest Calculator">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <NumberInput
              className="w-32"
              label="Initial Investment"
              onChange={handleInitialInvestmentChange}
            />
            <NumberInput
              className="w-32"
              label="Term Length (years)"
              onChange={handleTermLengthChange}
            />
            <NumberInput
              className="w-32"
              label="Interest Rate (%)"
              onChange={handleInterestRateChange}
              decimal
            />
            <NumberInput
              className="w-32"
              label="Periodic Investment"
              onChange={handlePeriodicInvestmentChange}
              decimal
            />
            <Dropdown
              placeholder="select period"
              label="accrual period"
              options={["monthly", "quarterly"]}
              setSelection={handleAccrualPeriodChange}
            />
          </div>
          <Button
            type="button"
            onClick={calculateFinalAmount}
            bg="cyan-900"
            hoverBg="cyan-800"
            scale
          >
            Calculate
          </Button>
          {finalAmount > 0 && (
            <>
              <div className="text-2xl">
                Final Amount: ${formatNumber(finalAmount)}
              </div>
              <div className="text-xl">
                Total Invested: ${formatNumber(totalInvested)}
              </div>
              <div className="text-xl">
                Total Interest Earned: ${formatNumber(totalInterest)}
              </div>
              <InvestmentChart
                investmentData={investmentData}
                interestData={interestData}
                totalValueData={totalValueData}
                periods={termLength * (accrualPeriod === "monthly" ? 12 : 4)}
              />
            </>
          )}
        </div>
      </Section>
    </div>
  );
};

interface InvestmentChartProps {
  investmentData: number[];
  interestData: number[];
  totalValueData: number[];
  periods: number;
}

const InvestmentChart = ({
  investmentData,
  interestData,
  totalValueData,
  periods,
}: InvestmentChartProps) => {
  const months = periods <= 24;
  const labels = Array.from(
    { length: months ? periods : Math.ceil(periods / 12) },
    (_, i) => (months ? i + 1 : i + 1)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Investment",
        data: months
          ? investmentData
          : investmentData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Interest Earned",
        data: months
          ? interestData
          : interestData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Total Value",
        data: months
          ? totalValueData
          : totalValueData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Investment Growth Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: months ? "Months" : "Years",
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: "USD",
        },
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return <Line className="bg-zinc-900" data={data} options={options} />;
};

export default InterestCalculator;
