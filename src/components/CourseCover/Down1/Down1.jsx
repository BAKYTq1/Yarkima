import React from "react";

export const Down1 = ({ className, onClick }) => {
  return (
    <svg
      className={`down-1 ${className}`}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick} // Добавляем обработчик клика
    >
      <path
        className="path"
        d="M13 6L8 11L3 6"
        stroke="#191A26"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
