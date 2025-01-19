import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import searchQuery from "@/actions/search";
import React from "react";
import SearchResultData from "./search-result-data";

const searchSchema = z.object({
  query: z.string().min(3, {
    message: "Query must be at least 3 characters.",
  }),
});

const QuerySearch = () => {
  const [results, setResults] = React.useState<any>(null);
  const [supportInfo, setSupportInfo] = React.useState<any[]>([]);
  // const [query, setQuery] = React.useState<string>("");
  const [render, setRender] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    const res = await searchQuery(values.query);

    setResults(res.results.main_response);
    setSupportInfo(res.results.support_info);
  }

  React.useEffect(() => {
    if (results) {
      setRender(true);
    }
  }, [results]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Bar</FormLabel>
                <FormControl>
                  <Input placeholder="Search your query..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>

      {render && (
        <SearchResultData mainResponse={results} supportInfo={supportInfo} />
      )}
    </>
  );
};

export default QuerySearch;
