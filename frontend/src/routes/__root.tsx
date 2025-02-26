import { Outlet, Link } from "@tanstack/react-router";

import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {

  return (
    <>
      <div className="py-2 flex max-w-2xl mx-auto justify-between items-center ">
        <Link to="/" className="text-2xl">
          Expense Tracker
        </Link>
        <div className="flex gap-x-4">
          {" "}
          <Link
            to="/all-expenses"
            className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            All Expenses
          </Link>{" "}
          <Link
            to="/new-expense"
            className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            New Expense
          </Link>
          <Link
            to="/about"
            className="[&.active]:text-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>
      </div>
      <hr />
      <div className="bg-background text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}
