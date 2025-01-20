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
import toast from "react-hot-toast";

const searchSchema = z.object({
  query: z.string().min(3, {
    message: "Query must be at least 3 characters.",
  }),
});

const QuerySearch = () => {
  const [results, setResults] = React.useState<any>(null);
  const [supportInfo, setSupportInfo] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [query, setQuery] = React.useState<string>("");
  const [render, setRender] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    setLoading(true);
    try {
      const res = await searchQuery(values.query);
      setResults(res.results.main_response);
      setSupportInfo(res.results.support_info);
    } catch (error) {
      toast.error("Error fetching search results");
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
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
          <Button type="submit" disabled={loading}>
            Search
          </Button>
        </form>
      </Form>

      {render ? (
        <div>
          <SearchResultData mainResponse={results} supportInfo={supportInfo} />
          <Button
            onClick={() => {
              setResults(null);
              setSupportInfo([]);
              setRender(false);
            }}
            variant={"destructive"}
            size={"sm"}
          >
            Clear Response
          </Button>
        </div>
      ) : (
        <div className="text-zinc-800 text-sm relative mt-12">
          <h1>Important Information:</h1>
          <ul className="list-disc list-inside">
            <li>
              The search results are generated using a language model and may
              not be 100% accurate.
            </li>
            <li>
              Review the results carefully before making any decisions based on
              them.
            </li>
            <li>
              Provide clear and specific queries for better search results.
            </li>
            <li>
              Contact support if you encounter any issues or have any questions.
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default QuerySearch;
