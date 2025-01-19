"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SupportInfo {
  file_name: string;
  similarity_score: number;
  text: string;
}

interface SimpleDataShowcaseProps {
  mainResponse: string;
  supportInfo: SupportInfo[];
}

export default function SearchResultData({
  mainResponse,
  supportInfo,
}: SimpleDataShowcaseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getSimilarityColor = (score: number) => {
    if (score > 0.05) return "text-green-600";
    if (score > 0.03) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 overflow-y-scroll max-h-[37.5vh]">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-2">Main Response</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            {isOpen
              ? mainResponse
              : `${mainResponse.slice(0, 200)}${
                  mainResponse.length > 200 ? "..." : ""
                }`}
          </p>
          {mainResponse.length > 200 && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              {isOpen ? (
                <>
                  Show Less <ChevronUp className="inline ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="inline ml-1 h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Support Information</h2>
        {supportInfo.map((info, index) => (
          <div
            key={index}
            className="space-y-1 pb-2 border-b border-gray-200 last:border-b-0"
          >
            <h3 className="font-medium">{info.file_name}</h3>
            <p
              className={`text-sm ${getSimilarityColor(info.similarity_score)}`}
            >
              Similarity Score: {info.similarity_score.toFixed(4)}
            </p>
            <p className="text-sm text-gray-700">{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
