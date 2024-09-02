import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

interface TodoFormProps {
  form: UseFormReturn<
    {
      title: string;
      text: string;
      status: string;
      deadline: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}

export default function TodoForm({ form }: TodoFormProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Todo title</FormLabel>
            <FormControl>
              <Input placeholder="Todo title..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Todo content</FormLabel>
            <FormControl>
              <Input placeholder="Todo content..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Todo status</FormLabel>
            <FormControl>
              <Input placeholder="Todo status..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Todo deadline</FormLabel>
            <FormControl>
              <Input type="date" placeholder="Todo deadline..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
