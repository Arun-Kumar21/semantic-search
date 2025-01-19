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
    if (localStorage.getItem("currentStage") === "search") {
      setCurrentStage("search");
    }
  }, []);

  return (
    <Container>
      <div className="w-full min-h-screen relative">
        <Nav />

        <div className="flex justify-center my-4">
          <Button
            className={`px-4 py-2 mx-2 hover:text-white ${
              currentStage === "upload"
                ? "bg-blue-500 text-white"
                : "bg-neutral-200 text-black"
            }`}
            onClick={() => setCurrentStage("upload")}
          >
            Upload
          </Button>
          <Button
            className={`px-4 py-2 mx-2 hover:text-white ${
              currentStage === "search"
                ? "bg-blue-500 text-white"
                : "bg-neutral-200 text-black"
            }`}
            onClick={() => setCurrentStage("search")}
          >
            Search
          </Button>
        </div>

        {currentStage === "upload" ? (
          <FileUploadForm />
        ) : (
          <div className="my-12">
            <QuerySearch />

            <div className="text-zinc-800 text-sm relative mt-12">
              <h1>Important Information:</h1>
              <ul className="list-disc list-inside">
                <li>
                  The search results are generated using a language model and
                  may not be 100% accurate.
                </li>
                <li>
                  Review the results carefully before making any decisions based
                  on them.
                </li>
                <li>
                  Provide clear and specific queries for better search results.
                </li>
                <li>
                  Contact support if you encounter any issues or have any
                  questions.
                </li>
              </ul>
            </div>
          </div>
        )}

        {currentStage === "upload" && (
          <div className="text-zinc-800 text-sm relative">
            <h1>Before you proceed:</h1>
            <ul className="list-disc list-inside">
              <li>Ensure the file is UTF-8 encoded.</li>
              <li>
                Currently model supports only text files. Other file types will
                be supported in future.
              </li>
              <li>
                Ensure the file is not empty and contains at least one sentence.
              </li>
              <li>
                Use clear and specific keywords for more accurate search
                results.
              </li>
            </ul>
          </div>
        )}
        <Footer />
      </div>
    </Container>
  );
}

export default Home;
