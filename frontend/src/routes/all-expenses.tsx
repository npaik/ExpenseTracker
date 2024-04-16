import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "@/lib/utils";

import { createFileRoute } from "@tanstack/react-router";

import { useQuery, useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { deleteExpense } from "@/network";
import { queryClient } from "@/main";

export const Route = createFileRoute("/all-expenses")({
  component: AllExpenses,
});

type Expense = {
  id: number;
  title: string;
  total: number;
};

// const fakeExpenses: Expense[] = [
//   {
//     id: 1,
//     title: "Groceries",
//     amount: 1000,
//   },
//   {
//     id: 2,
//     title: "Gas",
//     amount: 2000,
//   },
//   {
//     id: 3,
//     title: "Rent",
//     amount: 3000,
//   },
// ];

function AllExpenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["allExpenseData"],
    queryFn: () => fetch("/api/Expenses").then((res) => res.json()),
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allExpenseData"] });
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;
  // console.log(data.total);

  // console.log(data);
  return (
    <>
      <h1 className="text-2xl">All Expenses</h1>
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Title</TableHead>{" "}
            <TableHead className="w-1/4 text-right">Amount</TableHead>{" "}
            <TableHead className="w-1/4 text-right">Actions</TableHead>{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((expense: Expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.title}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(expense.total)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => {
                      deleteExpenseMutation.mutate(expense.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
