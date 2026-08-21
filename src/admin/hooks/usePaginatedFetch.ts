import { useCallback, useEffect, useRef, useState } from "react";
import type { PaginatedResponse } from "../../api/types";

export interface PaginationState<T> {
  items: T[];
  meta: PaginatedResponse<T>["meta"];
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  reload: () => void;
}

const emptyMeta = {
  current_page: 1,
  per_page: 10,
  total: 0,
  total_pages: 1,
  has_next_page: false,
  has_prev_page: false,
};

export function usePaginatedFetch<T>(
  fetcher: (page: number, perPage: number) => Promise<PaginatedResponse<T>>,
  perPage = 10,
): PaginationState<T> {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState(emptyMeta);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const load = useCallback(
    (targetPage: number) => {
      setLoading(true);
      setError(null);
      fetcherRef
        .current(targetPage, perPage)
        .then((result) => {
          setItems(result.data);
          setMeta(result.meta);
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : "Gagal memuat data");
        })
        .finally(() => setLoading(false));
    },
    [perPage],
  );

  useEffect(() => {
    load(page);
  }, [load, page]);

  const reload = useCallback(() => load(page), [load, page]);

  return { items, meta, loading, error, page, setPage, reload };
}