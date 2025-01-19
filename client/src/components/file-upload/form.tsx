import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import uploadFiles from "@/actions/upload";

type DataType = "text";

export interface FormValues {
  dataType: DataType;
  file: File | null;
}

const FileUploadForm = () => {
  const [selectedFileName, setSelectedFileName] = React.useState<string>("");

  const form = useForm<FormValues>({
    defaultValues: {
      dataType: "text",
      file: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.file) {
      return;
    } else {
      uploadFiles(data);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFileName(file.name);
      form.setValue("file", file);
    }
  };

  return (
    <div className="w-full my-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Upload your Data</h1>
        <p className="text-sm text-muted-foreground">
          Select the type of data you are using and upload the data you want to
          query.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="dataType"
            rules={{ required: "Please select a data type" }}
            render={({ field }) => (
              <FormItem className="my-6">
                <FormLabel className="text-sm">Source:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px] h-8 text-sm">
                      <SelectValue placeholder="Select files format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="text">Text files</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            rules={{
              required: "Please select a file",
              validate: (value) => {
                if (!value) {
                  return "Please select a file";
                }
                return true;
              },
            }}
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormControl>
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept=".txt"
                      className="hidden"
                      onChange={handleFileChange}
                      {...field}
                    />
                    <div className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                      {selectedFileName || "Click to upload"}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            Upload Data
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FileUploadForm;
