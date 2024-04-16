import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createExpense } from "@/network";

export const Route = createFileRoute("/new-expense")({
  component: NewExpensePage,
});

function NewExpensePage() {
  const navigate = useNavigate({ from: "/new-expense" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      total: 0,
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allExpenseData"] });
      navigate({ to: "/all-expenses" });
    },
    onError: () => {
      alert("Error creating expense");
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, total } = values;
    try {
      addExpenseMutation.mutate({ title, total });
    } catch (error) {
      alert("Error creating food");
    } finally {
      navigate({ to: "/all-expenses" });
    }
  };

  return (
    <>
      <Form {...form}>
        <h1 className="text-2xl">New Expense</h1>

        <form
          className="flex flex-col gap-y-10"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>What have you spent money on?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="How much did you spend?"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value !== "" ? Number(value) : null);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  How much did you spend on this?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
