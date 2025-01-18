import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import seachQuery from "@/actions/search";
import React from "react";

const searchSchema = z.object({
  query: z.string().min(3),
});

const Search = () => {
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof searchSchema>) => {
    const res = await seachQuery(data.query);
    setSearchResults(res);
  };

  console.log(searchResults);

  return (
    <div className="w-full h-full mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your search query..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-sm my-2" size={"sm"}>
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
