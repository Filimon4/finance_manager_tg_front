import React, { FC, ReactNode } from "react";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ref: React.RefObject<HTMLElement>
};

export const ModalContainer: FC<ModalContainerProps> = ({ isOpen, onClose, children, ref }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="bg-white rounded-lg shadow-xl p-6 relative max-w-md w-full">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};