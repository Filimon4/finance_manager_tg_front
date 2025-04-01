//@ts-nocheck
import { FC, useEffect, useRef } from "react";

interface useOutsideClickProps {
  onClick: () => void;
}

const useOutsideClick: FC<useOutsideClickProps> = ({ onClick }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClick]);

  return ref;
};

export default useOutsideClick;
