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
import Button from "components/common/Button";
import NumberInput from "components/common/NumberInput";
import Section from "components/layout/Section";
import { useState } from "react";
import { Line } from "react-chartjs-2";

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

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [loanBalanceData, setLoanBalanceData] = useState<number[]>([]);
  const [loanPaymentsData, setLoanPaymentsData] = useState<number[]>([]);
  const [loanInterestData, setLoanInterestData] = useState<number[]>([]);

  const handleLoanAmountChange = (value: number) => {
    setLoanAmount(value);
  };

  const handleLoanTermChange = (value: number) => {
    setLoanTerm(value);
    clearCalculatedData();
  };

  const handleInterestRateChange = (value: number) => {
    setInterestRate(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      calculateMonthlyPayment();
    }
  };

  const clearCalculatedData = () => {
    setMonthlyPayment(0);
    setLoanBalanceData([]);
    setLoanPaymentsData([]);
    setLoanInterestData([]);
  };

  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0 || loanTerm <= 0 || interestRate <= 0) {
      return;
    }
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyPayment(payment);
    calculateLoanBalanceOverTime(
      loanAmount,
      monthlyInterestRate,
      numberOfPayments,
      payment
    );
  };

  const calculateLoanBalanceOverTime = (
    principal: number,
    monthlyInterestRate: number,
    numberOfPayments: number,
    payment: number
  ) => {
    const balances = [];
    const payments = [];
    const interests = [];
    let balance = principal;
    let totalPaid = 0;
    let totalInterest = 0;
    for (let i = 0; i < numberOfPayments; i++) {
      const interest = balance * monthlyInterestRate;
      balance = balance + interest - payment;
      totalPaid += payment;
      totalInterest += interest;
      balances.push(balance);
      payments.push(totalPaid);
      interests.push(totalInterest);
    }
    payments.push(totalPaid);
    interests.push(totalInterest);
    setLoanBalanceData(balances);
    setLoanPaymentsData(payments);
    setLoanInterestData(interests);
  };

  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Section title="Loan Calculator">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <NumberInput
              className="w-32"
              label="Loan Amount"
              onChange={handleLoanAmountChange}
              onKeyDown={handleKeyPress}
            />
            <NumberInput
              className="w-32"
              label="Loan Term (years):"
              onChange={handleLoanTermChange}
              onKeyDown={handleKeyPress}
            />
            <NumberInput
              className="w-32"
              label="Interest Rate (%):"
              onChange={handleInterestRateChange}
              decimal
              onKeyDown={handleKeyPress}
            />
          </div>
          <Button
            type="button"
            onClick={calculateMonthlyPayment}
            bg="cyan-900"
            hoverBg="cyan-800"
            scale
          >
            calculate
          </Button>
        </div>
        {loanBalanceData.length > 0 && (
          <BalanceChart
            monthlyPayment={monthlyPayment}
            months={loanTerm <= 2}
            balanceData={loanBalanceData}
            paymentData={loanPaymentsData}
            interestData={loanInterestData}
          />
        )}
      </Section>
    </div>
  );
};

interface BalanceChartProps {
  monthlyPayment: number;
  months: boolean;
  balanceData: number[];
  paymentData: number[];
  interestData: number[];
}

const BalanceChart = ({
  monthlyPayment,
  months,
  balanceData,
  paymentData,
  interestData,
}: BalanceChartProps) => {
  const data = {
    labels: Array.from(
      { length: months ? balanceData.length : balanceData.length / 12 },
      (_, i) => (months ? i + 1 : i + 1)
    ),
    datasets: [
      {
        label: "Loan Balance",
        data: months ? balanceData : balanceData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Total Paid",
        data: months ? paymentData : paymentData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Total Interest",
        data: months
          ? interestData
          : interestData.filter((_, i) => i % 12 === 0),
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
        text: "Loan Balance Over Time",
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

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-4 bg-zinc-900 p-4 border">
      <h2 className="text-2xl">
        Monthly Payment: ${formatNumber(monthlyPayment)}
      </h2>
      <h2 className="text-2xl">
        Total Payment: ${formatNumber(paymentData[paymentData.length - 1])}
      </h2>
      <Line className="bg-zinc-900" data={data} options={options} />
    </div>
  );
};

export default LoanCalculator;
