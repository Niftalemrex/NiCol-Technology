import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      {children}
    </div>
  );
};

export default Card;