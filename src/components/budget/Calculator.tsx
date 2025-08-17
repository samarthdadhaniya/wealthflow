import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Calculator({ isOpen, onClose }: CalculatorProps) {
  // Basic calculator state
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Financial calculators state
  const [sipAmount, setSipAmount] = useState('');
  const [sipDuration, setSipDuration] = useState('');
  const [sipRate, setSipRate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentRate, setInvestmentRate] = useState('');
  const [investmentYears, setInvestmentYears] = useState('');

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const addDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Financial calculation functions
  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const r = parseFloat(sipRate) / 100 / 12;
    const n = parseFloat(sipDuration) * 12;
    
    if (P && r && n) {
      const amount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = P * n;
      const returns = amount - invested;
      return { amount: amount.toFixed(2), invested: invested.toFixed(2), returns: returns.toFixed(2) };
    }
    return null;
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / 100 / 12;
    const n = parseFloat(loanTenure) * 12;
    
    if (P && r && n) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;
      return { emi: emi.toFixed(2), totalAmount: totalAmount.toFixed(2), totalInterest: totalInterest.toFixed(2) };
    }
    return null;
  };

  const calculateCompoundInterest = () => {
    const P = parseFloat(investmentAmount);
    const r = parseFloat(investmentRate) / 100;
    const t = parseFloat(investmentYears);
    
    if (P && r && t) {
      const amount = P * Math.pow(1 + r, t);
      const interest = amount - P;
      return { amount: amount.toFixed(2), interest: interest.toFixed(2) };
    }
    return null;
  };

  const buttons = [
    { label: 'C', action: clear, className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90' },
    { label: 'CE', action: clearEntry, className: 'bg-warning text-warning-foreground hover:bg-warning/90' },
    { label: '⌫', action: () => setDisplay(display.slice(0, -1) || '0'), className: 'bg-warning text-warning-foreground hover:bg-warning/90' },
    { label: '÷', action: () => inputOperator('/'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    
    { label: '7', action: () => inputNumber('7'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '8', action: () => inputNumber('8'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '9', action: () => inputNumber('9'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '×', action: () => inputOperator('*'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    
    { label: '4', action: () => inputNumber('4'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '5', action: () => inputNumber('5'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '6', action: () => inputNumber('6'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '−', action: () => inputOperator('-'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    
    { label: '1', action: () => inputNumber('1'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '2', action: () => inputNumber('2'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '3', action: () => inputNumber('3'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '+', action: () => inputOperator('+'), className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    
    { label: '0', action: () => inputNumber('0'), className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 col-span-2' },
    { label: '.', action: addDecimal, className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { label: '=', action: performCalculation, className: 'bg-success text-success-foreground hover:bg-success/90' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Financial Calculator</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
            <TabsTrigger value="loan">Loan EMI</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>

          {/* Basic Calculator */}
          <TabsContent value="basic" className="space-y-4">
            <Card className="p-4 bg-secondary">
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-foreground">
                  {display}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-4 gap-2">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.action}
                  className={`h-12 text-lg font-semibold ${button.className}`}
                  variant="outline"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </TabsContent>

          {/* SIP Calculator */}
          <TabsContent value="sip" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">SIP Calculator</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="sipAmount">Monthly Investment (₹)</Label>
                    <Input
                      id="sipAmount"
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                      placeholder="5000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sipRate">Expected Annual Return (%)</Label>
                    <Input
                      id="sipRate"
                      type="number"
                      value={sipRate}
                      onChange={(e) => setSipRate(e.target.value)}
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sipDuration">Investment Period (Years)</Label>
                    <Input
                      id="sipDuration"
                      type="number"
                      value={sipDuration}
                      onChange={(e) => setSipDuration(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">SIP Results</h3>
                {calculateSIP() ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Investment:</span>
                      <span className="font-semibold">₹{calculateSIP()?.invested}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Returns:</span>
                      <span className="font-semibold text-success">₹{calculateSIP()?.returns}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Maturity Amount:</span>
                      <span className="font-bold text-lg text-primary">₹{calculateSIP()?.amount}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Enter values to see results</p>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Loan EMI Calculator */}
          <TabsContent value="loan" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Loan EMI Calculator</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="1000000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loanRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="loanRate"
                      type="number"
                      value={loanRate}
                      onChange={(e) => setLoanRate(e.target.value)}
                      placeholder="8.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      placeholder="20"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">EMI Results</h3>
                {calculateEMI() ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monthly EMI:</span>
                      <span className="font-bold text-lg text-primary">₹{calculateEMI()?.emi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold text-warning">₹{calculateEMI()?.totalInterest}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-semibold">₹{calculateEMI()?.totalAmount}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Enter values to see results</p>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Investment Calculator */}
          <TabsContent value="investment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Compound Interest Calculator</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="investmentAmount">Principal Amount (₹)</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="100000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="investmentRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="investmentRate"
                      type="number"
                      value={investmentRate}
                      onChange={(e) => setInvestmentRate(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="investmentYears">Time Period (Years)</Label>
                    <Input
                      id="investmentYears"
                      type="number"
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Investment Results</h3>
                {calculateCompoundInterest() ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-semibold">₹{investmentAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Earned:</span>
                      <span className="font-semibold text-success">₹{calculateCompoundInterest()?.interest}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Maturity Amount:</span>
                      <span className="font-bold text-lg text-primary">₹{calculateCompoundInterest()?.amount}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Enter values to see results</p>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}