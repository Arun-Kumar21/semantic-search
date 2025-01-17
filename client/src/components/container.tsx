import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full max-w-xl flex justify-center mx-auto geist-base p-4 min-h-screen">
    {children}
  </div>
);

export default Container;
