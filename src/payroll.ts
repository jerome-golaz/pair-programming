export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  // TODO: implement
  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
    
  };
  
  // Alter herausfinden Jerome | AHV, IV und EO
  const today = new Date()
  let age = today.getFullYear() - salary.born.getFullYear()

  let alreadyHadBirthday = false

  if (today.getMonth() > salary.born.getMonth() || (today.getMonth() == salary.born.getMonth() && today.getDate() >= salary.born.getDate())) {
    alreadyHadBirthday = true
  }

  if (!alreadyHadBirthday) {
    age--
  }

  if (age >= 17 && today.getMonth() >= 1) {
    result.deductions.set("AHV", DEDUCTION_RATES.get("AHV"))
    result.deductions.set("IV", DEDUCTION_RATES.get("IV"))
    result.deductions.set("EO", DEDUCTION_RATES.get("EO"))
  }

  // Jahreslohn über 2500 Nils | ALV und NBU



  // Jahreslohn über 22680 Nils | PK



  return result;

}
