import { useEffect, useRef } from "react";

export const useOutSideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutSide);
    document.addEventListener("touchend", handleClickOutSide);

    return () => {
      document.removeEventListener("mouseup", handleClickOutSide);
      document.removeEventListener("touchend", handleClickOutSide);
    };
  });

  return ref
}