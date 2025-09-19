import React from "react";

export default function TransactionsList({ transactions = [] }) {
  return (
    <ul data-testid="transactions-list">
      {transactions.map((tx) => (
        <li key={tx.id} data-testid="transaction-item">
          <span>{tx.description}</span> - ${tx.amount} ({tx.date})
        </li>
      ))}
    </ul>
  );
}