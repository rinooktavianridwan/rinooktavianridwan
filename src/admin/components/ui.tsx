import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useEffect, useState } from "react";
import { resolveAssetUrl } from "../../api/client";
import { isEmojiIcon } from "../../utils/icon.util";

const variants = {
  primary:
    "bg-gradient-to-r from-[#3E8DE3] to-[#2E6FBF] hover:from-[#2E6FBF] hover:to-[#1f57a8] text-white shadow-[0_8px_20px_rgba(30,111,191,0.35)]",
  "primary-dark":
    "bg-gradient-to-r from-[#143AA2] to-[#102c7b] hover:from-[#102c7b] hover:to-[#0c2260] text-white shadow-[0_8px_20px_rgba(20,58,162,0.35)]",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-[0_6px_16px_rgba(220,38,38,0.32)]",
  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3E8DE3]/50 ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="w-4 h-4 border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-block w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
}

export function LoadingScreen({ message = "Memuat..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
      <Spinner className="w-8 h-8 border-4 border-[#3E8DE3] border-t-transparent" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <div className="py-14 text-center text-slate-400 text-sm">{message}</div>;
}

interface FieldProps {
  label?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, required, hint, children }: FieldProps) {
  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-semibold text-slate-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      )}
      {children}
      {hint && <span className="block text-xs text-slate-500 mt-1">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 border border-[#c8d9f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E8DE3]/35 focus:border-[#3E8DE3] text-sm bg-white/95 text-slate-800 placeholder:text-slate-400 transition";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#3E8DE3] ${checked ? "bg-[#3E8DE3]" : "bg-gray-300"} ${disabled ? "opacity-50" : ""}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`}
        />
      </button>
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </div>
  );
}

export function Badge({
  color,
  children,
}: {
  color?: string;
  children: ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={color ? { backgroundColor: `${color}18`, color } : undefined}
    >
      {children}
    </span>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

interface TableProps {
  head: ReactNode;
  children: ReactNode;
}

export function Table({ head, children }: TableProps) {
  return (
    <div className="bg-white/92 backdrop-blur rounded-2xl shadow-[0_12px_28px_rgba(17,24,39,0.08)] border border-[#d9e6fb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#eef4ff] text-slate-600 uppercase text-xs">
            {head}
          </thead>
          <tbody className="divide-y divide-[#e5ecf9]">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

interface IconPreviewProps {
  src?: string;
  alt?: string;
  sizeClass?: string;
}

export function IconPreview({
  src,
  alt = "icon",
  sizeClass = "w-8 h-8",
}: IconPreviewProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  if (!src) {
    return <div className={`${sizeClass} bg-slate-100 rounded-md flex items-center justify-center text-slate-300`}>-</div>;
  }
  if (isEmojiIcon(src)) {
    return (
      <span className={`${sizeClass} flex items-center justify-center text-xl`} role="img" aria-label={alt}>
        {src}
      </span>
    );
  }
  const imageUrl = resolveAssetUrl(src);
  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        title="Lihat gambar"
        aria-label={`Lihat ${alt}`}
        className={`${sizeClass} block cursor-zoom-in rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E8DE3]/50`}
      >
        <img src={imageUrl} alt={alt} className="w-full h-full object-contain" />
      </button>
      {expanded && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#0b1738]/80"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${alt}`}
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative max-w-[min(90vw,48rem)] max-h-[90vh] rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Tutup preview"
              className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-white text-slate-600 shadow-md text-xl leading-none hover:bg-slate-100"
            >
              ×
            </button>
            <img
              src={imageUrl}
              alt={alt}
              className="max-w-[min(82vw,42rem)] max-h-[82vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}