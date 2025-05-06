import { calculatePayslip, Salary, Payslip, Deductions } from "./payroll";

test("16 years, 700.- monthly salary", () => {
  // Arrange
  const salary: Salary = {
    born: new Date(2009, 0, 1),
    payday: new Date(),
    gross: 700,
  };
  const expected: Payslip = {
    deductions: new Map([
      ["ALV", 1.1],
      ["NBU", 0.73],
    ]),
    net: 687.19,
    salary: salary,
    totalDeductions: 1.83,
  };

  // Act
  const actual = () => {
    return calculatePayslip(salary);
  };
  // Assert
  expect(actual()).toStrictEqual(expected);
});

test("18 years, 1200.- monthly salary", () => {
  // Arrange
  const salary: Salary = {
    born: new Date(2007, 0, 1),
    payday: new Date(),
    gross: 1200,
  };
  const expected: Payslip = {
    deductions: new Map([
      ["AHV", 8.7],
      ["IV", 1.4],
      ["EO", 0.5],
      ["ALV", 1.1],
      ["NBU", 0.73],
    ]),
    net: 1050.84,
    salary: salary,
    totalDeductions: 12.43,
  };

  // Act
  const actual = () => {
    return calculatePayslip(salary);
  };
  // Assert
  expect(actual()).toStrictEqual(expected);
});

test("21 years, 5900.- monthly salary", () => {
  // Arrange
  const salary: Salary = {
    born: new Date(2004, 0, 1),
    payday: new Date(),
    gross: 5900,
  };
  const expected: Payslip = {
    deductions: new Map([
      ["AHV", 8.7],
      ["IV", 1.4],
      ["EO", 0.5],
      ["ALV", 1.1],
      ["NBU", 0.73],
      ["PK", 8.9],
    ]),
    net: 4641.53,
    salary: salary,
    totalDeductions: 21.33,
  };

  // Act
  const actual = () => {
    return calculatePayslip(salary);
  };
  // Assert
  expect(actual()).toStrictEqual(expected);
});
