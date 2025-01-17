import React from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";
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
import { Textarea } from "@/components/ui/textarea";
import uploadFiles from "@/actions/upload";

type DataType = "mdx" | "pdf" | "text";
type UploadMethod = "upload" | "paste";

export interface FormValues {
  dataType: DataType;
  content: string;
  file: FileList | null;
}

const FileUploadForm = () => {
  const [uploadMethod, setUploadMethod] =
    React.useState<UploadMethod>("upload");
  const [selectedFileName, setSelectedFileName] = React.useState<string>("");

  const [socket, setSocket] = React.useState<any>();

  React.useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);
    setSocket(socket);

    socket.on("processing_status", (data: any) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      dataType: "text",
      content: "",
      file: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.file) {
      // Text content
      return;
    } else {
      uploadFiles(data);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name);
      form.setValue("file", files);
    }
  };

  const getFileExtension = (dataType: DataType): string => {
    switch (dataType) {
      case "mdx":
        return ".mdx";
      case "pdf":
        return ".pdf";
      case "text":
        return ".txt";
      default:
        return ".txt";
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
                    <SelectItem value="mdx">Markdown files</SelectItem>
                    <SelectItem value="pdf">PDF files</SelectItem>
                    <SelectItem value="text">Text files</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <FormLabel className="text-sm text-gray-600">
                Upload Method
              </FormLabel>
              <div className="flex text-sm space-x-4">
                <button
                  type="button"
                  onClick={() => setUploadMethod("upload")}
                  className={`${
                    uploadMethod === "upload" ? "text-black" : "text-gray-400"
                  }`}
                >
                  Upload Files
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod("paste")}
                  className={`${
                    uploadMethod === "paste" ? "text-black" : "text-gray-400"
                  }`}
                >
                  Paste Data
                </button>
              </div>
            </div>

            {uploadMethod === "paste" ? (
              <FormField
                control={form.control}
                name="content"
                rules={{
                  required:
                    uploadMethod === "paste"
                      ? "Please enter some content"
                      : false,
                  minLength: {
                    value: 10,
                    message: "Content must be at least 10 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="w-full h-28 p-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Paste your data here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="file"
                rules={{
                  required:
                    uploadMethod === "upload" ? "Please select a file" : false,
                  validate: (value) => {
                    if (
                      uploadMethod === "upload" &&
                      (!value || value.length === 0)
                    ) {
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
                          accept={getFileExtension(form.watch("dataType"))}
                          className="hidden"
                          onChange={handleFileChange}
                          {...field}
                        />
                        <div className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                          {selectedFileName ||
                            "Drop your file here or click to upload"}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

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
