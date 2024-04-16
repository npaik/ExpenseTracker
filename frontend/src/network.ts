export type Expense = {
  id: number;
  title: string;
  total: number;
};

export async function getExpenses() {
  const result = await fetch("/api/Expenses");
  return await result.json();
}

export async function deleteExpense(id: number) {
  await fetch(`/api/Expenses/${id}`, { method: "DELETE" });
}

export async function createExpense({
  title,
  total,
}: {
  title: string;
  total: number;
}) {
  const expense = await fetch("/api/Expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, total }),
  }).then((response) => response.json());
  return expense;
}

export async function updateExpense({
  id,
  newExpense,
}: {
  id: number;
  newExpense: Expense;
}) {
  console.log("updateExpense", id, newExpense);
  const resp = await fetch(`/api/Expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExpense),
  });

  return resp;
}
