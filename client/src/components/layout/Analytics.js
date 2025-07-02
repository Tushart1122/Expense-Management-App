import React from "react";
import { Progress } from "antd";

const Analytics = ({ alltransactions = [] }) => {
  const categories = [
    "salary", "food", "transport", "entertainment", "bills",
    "shopping", "health", "education", "utilities", "other"
  ];

  const incomeCategories = ["salary", "other"];
  const expenseCategories = categories.filter(
    cat => cat !== "salary" && cat !== "other"
  );

  const totalTransactions = alltransactions.length;

  const totalIncome = alltransactions.filter(
    transaction =>
      transaction.type && transaction.type.toLowerCase() === "income"
  );

  const totalExpense = alltransactions.filter(
    transaction =>
      transaction.type && transaction.type.toLowerCase() === "expense"
  );

  const totalTurnover = alltransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = totalIncome.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpenseTurnover = totalExpense.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomePercentage = ((totalIncome.length / totalTransactions) * 100) || 0;
  const totalExpensePercentage = ((totalExpense.length / totalTransactions) * 100) || 0;
  const totalIncomeTurnoverPercentage = totalTurnover
    ? (totalIncomeTurnover / totalTurnover) * 100
    : 0;
  const totalExpenseTurnoverPercentage = totalTurnover
    ? (totalExpenseTurnover / totalTurnover) * 100
    : 0;

  return (
    <div>
      {/* Main Analytics Cards */}
      <div className="analytics-row">
        {/* Transaction Count Analytics */}
        <div className="analytics-col">
          <div className="analytics-card">
            <div className="analytics-card-header">Total Transactions: {totalTransactions}</div>
            <div className="analytics-card-body">
              <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={Number(totalIncomePercentage.toFixed(0))}
                    strokeColor="green"
                    format={percent => `${percent}%`}
                    width={80}
                  />
                  <div className="mt-2 text-success">Income</div>
                </div>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={Number(totalExpensePercentage.toFixed(0))}
                    strokeColor="red"
                    format={percent => `${percent}%`}
                    width={80}
                  />
                  <div className="mt-2 text-danger">Expense</div>
                </div>
              </div>
              <h5 className="text-success">Income: {totalIncome.length}</h5>
              <h5 className="text-danger">Expense: {totalExpense.length}</h5>
            </div>
          </div>
        </div>

        {/* Turnover Analytics */}
        <div className="analytics-col">
          <div className="analytics-card">
            <div className="analytics-card-header">Total Turnover: ₹{totalTurnover}</div>
            <div className="analytics-card-body">
              <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={Number(totalIncomeTurnoverPercentage.toFixed(0))}
                    strokeColor="green"
                    format={percent => `${percent}%`}
                    width={80}
                  />
                  <div className="mt-2 text-success">Income</div>
                </div>
                <div className="text-center">
                  <Progress
                    type="circle"
                    percent={Number(totalExpenseTurnoverPercentage.toFixed(0))}
                    strokeColor="red"
                    format={percent => `${percent}%`}
                    width={80}
                  />
                  <div className="mt-2 text-danger">Expense</div>
                </div>
              </div>
              <h5 className="text-success">Income: ₹{totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: ₹{totalExpenseTurnover}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Categorywise Income and Expense side by side */}
      <div className="analytics-row">
        {/* Categorywise Income */}
        <div className="analytics-col">
          <h4 className="analytics-section-title">Categorywise Income</h4>
          {incomeCategories.map(category => {
            const incomeAmount = alltransactions
              .filter(
                t =>
                  t.category &&
                  t.category.toLowerCase().trim() === category.toLowerCase().trim() &&
                  t.type &&
                  t.type.toLowerCase() === "income"
              )
              .reduce((acc, curr) => acc + curr.amount, 0);

            const percent = totalIncomeTurnover
              ? ((incomeAmount / totalIncomeTurnover) * 100).toFixed(0)
              : 0;

            return (
              <div className="analytics-card" key={category + "-income"}>
                <div className="analytics-category-title">
                  <span>{category}</span>
                  <span>{percent}%</span>
                </div>
                <Progress
                  percent={Number(percent)}
                  strokeColor="#52c41a"
                  format={() => ""}
                />
              </div>
            );
          })}
        </div>

        {/* Categorywise Expense */}
        <div className="analytics-col">
          <h4 className="analytics-section-title">Categorywise Expense</h4>
          {expenseCategories.map(category => {
            const expenseAmount = alltransactions
              .filter(
                t =>
                  t.category &&
                  t.category.toLowerCase().trim() === category.toLowerCase().trim() &&
                  t.type &&
                  t.type.toLowerCase() === "expense"
              )
              .reduce((acc, curr) => acc + curr.amount, 0);

            const percent = totalExpenseTurnover
              ? ((expenseAmount / totalExpenseTurnover) * 100).toFixed(0)
              : 0;

            return (
              <div className="analytics-card" key={category + "-expense"}>
                <div className="analytics-category-title">
                  <span>{category}</span>
                  <span>{percent}%</span>
                </div>
                <Progress
                  percent={Number(percent)}
                  strokeColor="#f5222d"
                  format={() => ""}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
