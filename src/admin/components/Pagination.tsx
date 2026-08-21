import type { PaginationMeta } from "../../api/types";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  if (meta.total_pages <= 1) return null;

  const pageNumbers = getPageNumbers(meta.current_page, meta.total_pages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-sm text-gray-600">
      <span>
        Menampilkan {meta.per_page} dari {meta.total} data
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          disabled={!meta.has_prev_page}
          onClick={() => onPageChange(meta.current_page - 1)}
          className="px-3 py-1.5 border border-gray-300 rounded-md disabled:opacity-40 hover:bg-gray-100"
        >
          Prev
        </button>
        {pageNumbers.map((p, index) =>
          p === "…" ? (
            <span key={`dots-${index}`} className="px-2 py-1.5 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`px-3 py-1.5 border rounded-md ${
                p === meta.current_page
                  ? "bg-[#3E8DE3] text-white border-[#3E8DE3]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={!meta.has_next_page}
          onClick={() => onPageChange(meta.current_page + 1)}
          className="px-3 py-1.5 border border-gray-300 rounded-md disabled:opacity-40 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}