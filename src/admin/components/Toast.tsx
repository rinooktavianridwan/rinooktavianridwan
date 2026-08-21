import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ToastContext } from "./toast-context";
import type { ToastContextValue, ToastType } from "./toast-context";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

const styles: Record<ToastType, string> = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-[#143AA2]",
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ show }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[70] flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles[toast.type]} text-white px-4 py-3 rounded-md shadow-lg text-sm font-medium`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}