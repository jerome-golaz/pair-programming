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
  let result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,

  };

  const yearlySalary = result.net * 12;
  
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
    result = addDeduction(result, "AHV")
    result = addDeduction(result, "IV")
    result = addDeduction(result, "EO")
  }

  // Jahreslohn ab 2500 Nils | ALV und NBU
  if(yearlySalary >= 2500){
    result = addDeduction(result, "ALV")
    result = addDeduction(result, "NBU")
  }


  // Jahreslohn ab 22680 Nils | PK
  if(yearlySalary >= 22680){
    result = addDeduction(result, "PK")
  }

  result.net = Number((result.net - (result.net / 100 * result.totalDeductions)).toFixed(2))

  return result;

}

function addDeduction(result: Payslip, deduction: string): Payslip{
  result.deductions.set(deduction, DEDUCTION_RATES.get(deduction))
  result.totalDeductions += DEDUCTION_RATES.get(deduction)
  return result;
}