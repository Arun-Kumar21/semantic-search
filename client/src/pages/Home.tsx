import React from "react";

import Nav from "@/navigation/nav";
import Container from "@/components/container";
import FileUploadForm from "@/components/file-upload/form";
import Footer from "@/navigation/footer";
import QuerySearch from "@/components/search/query-search";
import { Button } from "@/components/ui/button";

function Home() {
  const [currentStage, setCurrentStage] = React.useState<"upload" | "search">(
    "upload"
  );

  React.useEffect(() => {
    if (sessionStorage.getItem("currentStage") === "search") {
      setCurrentStage("search");
    }
  }, [sessionStorage.getItem("currentStage")]);

  return (
    <Container>
      <div className="w-full min-h-screen relative">
        <Nav />

        <div className="flex justify-center my-4">
          <Button
            className={`px-4 py-2 mx-2  ${
              currentStage === "upload"
                ? "bg-black text-white"
                : "bg-neutral-200 text-black hover:bg-neutral-300"
            }`}
            onClick={() => setCurrentStage("upload")}
          >
            Upload
          </Button>
          <Button
            disabled={sessionStorage.getItem("currentStage") !== "search"}
            className={`px-4 py-2 mx-2 ${
              currentStage === "search"
                ? "bg-black text-white"
                : "bg-neutral-200 text-black hover:bg-neutral-300"
            }`}
            onClick={() => setCurrentStage("search")}
          >
            Search
          </Button>
        </div>

        <div className="min-h-[75vh]">
          {currentStage === "upload" ? (
            <FileUploadForm />
          ) : (
            <div className="mt-6">
              <QuerySearch />
            </div>
          )}

          {currentStage === "upload" && (
            <div className="text-zinc-800 text-sm relative">
              <h1>Before you proceed:</h1>
              <ul className="list-disc list-inside">
                <li>Ensure the file is UTF-8 encoded.</li>
                <li>
                  Currently model supports only text files. Other file types
                  will be supported in future.
                </li>
                <li>
                  Ensure the file is not empty and contains at least one
                  sentence.
                </li>
                <li>
                  Use clear and specific keywords for more accurate search
                  results.
                </li>
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </Container>
  );
}

export default Home;
