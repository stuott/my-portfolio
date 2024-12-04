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
    clearCalculatedData();
  };

  const handleLoanTermChange = (value: number) => {
    setLoanTerm(value);
    clearCalculatedData();
  };

  const handleInterestRateChange = (value: number) => {
    setInterestRate(value);
    //clearCalculatedData();
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
    balances.push(0); // Ensure the balance is zero at the end of the loan term
    payments.push(totalPaid);
    interests.push(totalInterest);
    setLoanBalanceData(balances);
    setLoanPaymentsData(payments);
    setLoanInterestData(interests);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const data = {
    labels: Array.from(
      { length: loanTerm <= 2 ? loanTerm * 12 : loanTerm },
      (_, i) => (loanTerm <= 2 ? i + 1 : i + 1)
    ),
    datasets: [
      {
        label: "Loan Balance",
        data:
          loanTerm <= 2
            ? loanBalanceData
            : loanBalanceData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Total Paid",
        data:
          loanTerm <= 2
            ? loanPaymentsData
            : loanPaymentsData.filter((_, i) => i % 12 === 0),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Total Interest",
        data:
          loanTerm <= 2
            ? loanInterestData
            : loanInterestData.filter((_, i) => i % 12 === 0),
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
          text: loanTerm <= 2 ? "Months" : "Years",
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

  return (
    <Section title="Loan Calculator" className="bg-zinc-900/50 min-h-screen">
      <form className="space-y-6">
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
        <Button type="button" onClick={calculateMonthlyPayment} bg="cyan-900">
          Calculate
        </Button>
      </form>
      {monthlyPayment > 0 && (
        <h2 className="text-2xl">
          Monthly Payment: ${formatNumber(monthlyPayment)}
        </h2>
      )}
      {loanPaymentsData.length > 0 && (
        <h2 className="text-2xl">
          Total Payment: $
          {formatNumber(loanPaymentsData[loanPaymentsData.length - 1])}
        </h2>
      )}
      {loanBalanceData.length > 0 && (
        <Line className="bg-zinc-900" data={data} options={options} />
      )}
    </Section>
  );
};

export default LoanCalculator;
