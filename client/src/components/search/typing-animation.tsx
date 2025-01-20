import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  onComplete: () => void;
}

export default function TypingAnimation({
  text,
  onComplete,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <p className="text-sm text-gray-700">{displayText}</p>;
}
