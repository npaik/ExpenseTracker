import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["totalExpenseData"],
    queryFn: () => fetch("/api/Expenses/total").then((res) => res.json()),
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;
  // console.log(data.total);
  // Get this from the api
  const totalSpent = formatCurrency(data.total);

  return (
    <>
      <Card className="w-fit mx-auto">
        <CardHeader>
          <CardTitle className="text-sm">Total Spent:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSpent}</div>
        </CardContent>
      </Card>
    </>
  );
}
