import React, { useState } from "react";

export default function AddTransactionForm({ postTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      description,
      amount: Number(amount),
      date: new Date().toISOString(),
    };

    // Let parent handle posting so tests can mock fetch on parent URL
    if (postTransaction) {
      postTransaction(payload);
    }

    setDescription("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} data-testid="add-form">
      <input
        data-testid="desc-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        data-testid="amount-input"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" data-testid="submit-btn">
        Add
      </button>
    </form>
  );
}