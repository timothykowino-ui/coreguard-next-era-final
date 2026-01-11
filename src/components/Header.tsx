import React from "react";
import FloatingNav from "./FloatingNav";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md shadow-glow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
         <a href="/" className="text-2xl font-orbitron font-bold text-foreground">
          CoreGuard Mobility
        </a>
        <FloatingNav />
      </div>
    </header>
  );
};
