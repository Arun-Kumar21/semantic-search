import { useEffect, useRef } from "react";

interface Log {
  timestamp: string;
  status: string;
  file: string;
  data?: Record<string, any>;
}

const ConversionLog = (logs: any) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
      <div
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm"
      ></div>
    </div>
  );
};

export default ConversionLog;
