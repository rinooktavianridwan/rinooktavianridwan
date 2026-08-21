import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { resolveAssetUrl } from "../../api/client";

const variants = {
  primary: "bg-[#3E8DE3] hover:bg-[#2E6FBF] text-white",
  "primary-dark": "bg-[#143AA2] hover:bg-[#0f2d80] text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
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
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
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
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500">
      <Spinner className="w-8 h-8 border-4 border-[#3E8DE3] border-t-transparent" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <div className="py-14 text-center text-gray-400 text-sm">{message}</div>;
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
        <span className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      )}
      {children}
      {hint && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E8DE3] focus:border-transparent text-sm bg-white";

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
      {label && <span className="text-sm text-gray-700">{label}</span>}
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
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            {head}
          </thead>
          <tbody className="divide-y divide-gray-100">{children}</tbody>
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
  if (!src) {
    return <div className={`${sizeClass} bg-gray-100 rounded flex items-center justify-center text-gray-300`}>–</div>;
  }
  if (isEmojiIcon(src)) {
    return (
      <span className={`${sizeClass} flex items-center justify-center text-xl`} role="img" aria-label={alt}>
        {src}
      </span>
    );
  }
  return (
    <img
      src={resolveAssetUrl(src)}
      alt={alt}
      className={`${sizeClass} object-contain`}
    />
  );
}

function isEmojiIcon(value: string): boolean {
  return value.length <= 2 && /\p{Emoji}/u.test(value);
}