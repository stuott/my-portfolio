import { Button, NumberInput } from "components/common";
import { Section } from "components/layout";
import { useState } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyPayment = (loanAmount * x * monthlyInterestRate) / (x - 1);
    setMonthlyPayment(monthlyPayment);
  };

  return (
    <Section title="Loan Calculator" className="bg-zinc-900/50 min-h-screen">
      <form className="space-y-6">
        <NumberInput
          className="w-32"
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
        />
        <NumberInput
          className="w-32"
          label="Loan Term (years):"
          value={loanTerm}
          onChange={setLoanTerm}
        />
        <NumberInput
          className="w-32"
          label="Interest Rate (%):"
          value={interestRate}
          onChange={setInterestRate}
          decimal
        />
        <Button type="button" onClick={calculateMonthlyPayment} bg="cyan-900">
          Calculate
        </Button>
      </form>
      {monthlyPayment > 0 && (
        <h2 className="text-2xl">
          Monthly Payment: ${monthlyPayment.toFixed(2)}
        </h2>
      )}
    </Section>
  );
};

export default LoanCalculator;
