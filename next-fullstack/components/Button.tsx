"use client";
import React, { FC } from "react";

interface ButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  styleProp: string;
}

const Button: FC<ButtonProps> = ({ handleClick, name, styleProp }) => {
  return (
    <div>
      <button
        className={`border-2  rounded-md p-1   text-white ${styleProp}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
