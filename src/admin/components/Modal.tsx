import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
}

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1738]/70"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.28)] border border-[#d9e6fb] w-full ${size === "lg" ? "max-w-4xl" : "max-w-xl"} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3ecfa] bg-[#f5f8ff]">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-[#e3ecfa] bg-slate-50 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}