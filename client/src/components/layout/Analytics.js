import React from "react";
import { Progress } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const Analytics = ({ alltransactions = [] }) => {
  const categories = [
    "salary", "food", "transport", "entertainment", "bills",
    "shopping", "health", "education", "utilities", "other"
  ];
  const incomeCategories = ["salary", "other"];
  const expenseCategories = categories.filter(
    cat => !incomeCategories.includes(cat)
  );

  const totalTransactions = alltransactions.length;

  const totalIncome = alltransactions.filter(
    t => t.type && t.type.toLowerCase() === "income"
  );
  const totalExpense = alltransactions.filter(
    t => t.type && t.type.toLowerCase() === "expense"
  );

  const totalTurnover = alltransactions.reduce(
    (acc, t) => acc + Number(t.amount), 0
  );
  const totalIncomeTurnover = totalIncome.reduce(
    (acc, t) => acc + Number(t.amount), 0
  );
  const totalExpenseTurnover = totalExpense.reduce(
    (acc, t) => acc + Number(t.amount), 0
  );
  const balance = totalIncomeTurnover - totalExpenseTurnover;

  // Percentages
  const totalIncomePerc = (totalIncome.length / totalTransactions) * 100 || 0;
  const totalExpensePerc = (totalExpense.length / totalTransactions) * 100 || 0;
  const incomeTurnoverPerc = totalTurnover ? (totalIncomeTurnover / totalTurnover) * 100 : 0;
  const expenseTurnoverPerc = totalTurnover ? (totalExpenseTurnover / totalTurnover) * 100 : 0;

  return (
   <div className="dashboard-background">
  {/* Header */}
  <div className="dashboard-header">
    <div>
      <h2 className="text-primary" style={{
        fontWeight: "700", 
        fontSize: "2rem",
        background: "linear-gradient(90deg, #a855f7 60%, #7c3aed 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent"
      }}>Hello Tushar</h2>
        </div>
        {/* Avatar (optional) */}
      </div>

      {/* Balance Card */}
      <div className="analytics-row" style={{marginBottom: "20px"}}>
        <div className="analytics-col">
          <div className="analytics-balance-card">
            <div style={{fontWeight: 500}}>Total Balance U Earned and Spent</div>
            <div style={{display:'flex',alignItems:'center',marginTop:"10px"}}>
              <span style={{
                fontSize:"2.1rem",
                fontWeight:600
              }}>₹ {balance}</span>
            </div>
            <div style={{fontSize:"1rem", marginTop:"6px"}}>
              <span className="text-success"><ArrowUpOutlined /> Income: ₹{totalIncomeTurnover}</span> &nbsp;&nbsp;
              <span className="text-danger"><ArrowDownOutlined /> Expense: ₹{totalExpenseTurnover}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="analytics-row">
        {/* Transaction Count Card */}
        <div className="analytics-col">
          <div className="analytics-card">
            <div className="analytics-card-header">Total Transactions</div>
            <div className="analytics-card-accent">{totalTransactions}</div>
            <div style={{ display: "flex", gap: 36, justifyContent: 'center'}}>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={Number(totalIncomePerc.toFixed(0))}
                  strokeColor="#22c55e"
                  format={percent => `${percent}%`}
                  width={70}
                />
                <div className="mt-2 text-success">Income</div>
              </div>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={Number(totalExpensePerc.toFixed(0))}
                  strokeColor="#ef4444"
                  format={percent => `${percent}%`}
                  width={70}
                />
                <div className="mt-2 text-danger">Expense</div>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: 16}}>
              <span className="text-success">Income: {totalIncome.length}</span>
              <span className="text-danger">Expense: {totalExpense.length}</span>
            </div>
          </div>
        </div>

        {/* Turnover Card */}
        <div className="analytics-col">
          <div className="analytics-card">
            <div className="analytics-card-header">Total Turnover</div>
            <div className="analytics-card-accent">₹{totalTurnover}</div>
            <div style={{ display: "flex", gap: 36, justifyContent: 'center'}}>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={Number(incomeTurnoverPerc.toFixed(0))}
                  strokeColor="#22c55e"
                  format={percent => `${percent}%`}
                  width={70}
                />
                <div className="mt-2 text-success">Income</div>
              </div>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={Number(expenseTurnoverPerc.toFixed(0))}
                  strokeColor="#ef4444"
                  format={percent => `${percent}%`}
                  width={70}
                />
                <div className="mt-2 text-danger">Expense</div>
              </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between",marginTop:16}}>
              <span className="text-success">₹{totalIncomeTurnover}</span>
              <span className="text-danger">₹{totalExpenseTurnover}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categorywise Income & Expense */}
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
              .reduce((acc, curr) => acc + Number(curr.amount), 0);

            const percent = totalIncomeTurnover
              ? ((incomeAmount / totalIncomeTurnover) * 100).toFixed(0)
              : 0;

            return (
              <div className="analytics-card" key={category + "-income"}>
                <div className="analytics-category-title">
                  <span style={{ textTransform: "capitalize" }}>{category}</span>
                  <span>{percent}% (₹{incomeAmount})</span>
                </div>
                <Progress
                  percent={Number(percent)}
                  strokeColor="#52c41a"
                  format={() => ""}
                  showInfo={false}
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
              .reduce((acc, curr) => acc + Number(curr.amount), 0);

            const percent = totalExpenseTurnover
              ? ((expenseAmount / totalExpenseTurnover) * 100).toFixed(0)
              : 0;

            return (
              <div className="analytics-card" key={category + "-expense"}>
                <div className="analytics-category-title">
                  <span style={{ textTransform: "capitalize" }}>{category}</span>
                  <span>{percent}% (₹{expenseAmount})</span>
                </div>
                <Progress
                  percent={Number(percent)}
                  strokeColor="#ef4444"
                  format={() => ""}
                  showInfo={false}
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
