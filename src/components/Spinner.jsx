// Spinner.js
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-[15px] border-t-[15px] border-black border-t-[#EC3642] border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
