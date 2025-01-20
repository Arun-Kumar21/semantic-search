"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TypingAnimation from "./typing-animation";
import SkeletonLoader from "./skeleton-loader";

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
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const getSimilarityColor = (score: number) => {
    if (score > 0.05) return "text-green-600";
    if (score > 0.03) return "text-yellow-600";
    return "text-red-600";
  };

  useEffect(() => {
    // Reset typing completion when mainResponse changes
    setIsTypingComplete(false);
  }, [mainResponse]);

  return (
    <div className="py-4 mt-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-2">LLM Response</h2>
        <div className="space-y-2">
          <TypingAnimation
            text={mainResponse}
            onComplete={() => {
              setTimeout(() => {
                setIsTypingComplete(true);
              }, 2000);
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold mb-2">Support Information</h2>
        {isTypingComplete ? (
          supportInfo.map((info, index) => (
            <div
              key={index}
              className="h-24 flex text-sm items-center justify-between p-4 bg-white rounded-sm border w-full"
            >
              <div className="flex flex-col">
                <h3 className="truncate font-medium">{info.file_name}</h3>
                <p className="text-sm text-gray-700 overflow-hidden line-clamp-2 overflow-ellipsis">
                  {info.text}
                </p>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  info.similarity_score > 0.05
                    ? "bg-green-100 text-green-800"
                    : info.similarity_score > 0.03
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {(Number(info.similarity_score.toFixed(5)) * 1000).toFixed(2)}%
              </div>
            </div>
          ))
        ) : (
          <SkeletonLoader />
        )}
      </div>
    </div>
  );
}
