import React, { useState, useEffect, useMemo } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  function postTransaction(newTransaction) {
    // Parent handles posting and updating state so child form stays simple
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => setTransactions((prev) => [...prev, data]));
  }

  function onSort(value) {
    setSortBy(value);
  }

  const displayedTransactions = useMemo(() => {
    const q = (search || "").toLowerCase();
    let filtered = transactions.filter((t) => {
      if (!q) return true;
      return (
        String(t.description || "").toLowerCase().includes(q) ||
        String(t.amount || "").toLowerCase().includes(q) ||
        String(t.category || "").toLowerCase().includes(q)
      );
    });

    if (sortBy === "amount") {
      filtered = filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "name") {
      filtered = filtered.sort((a, b) =>
        (a.description || "").localeCompare(b.description || "")
      );
    } else {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [transactions, search, sortBy]);

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
