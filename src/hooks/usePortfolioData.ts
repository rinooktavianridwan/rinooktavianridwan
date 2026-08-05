import { useEffect, useState } from "react";
import type { FullPortfolio } from "../api/types";
import { fetchFullPortfolio, isApiEnabled } from "../api/client";
import { technologies } from "../data/skillsData";
import { projects } from "../data/projectData";
import { contactData } from "../data/contactData";
import { profileData } from "../data/profileData";

export interface PortfolioState {
  data: FullPortfolio;
  loading: boolean;
  usingMock: boolean;
  error: string | null;
}

const mockPortfolio: FullPortfolio = {
  profile: profileData,
  contacts: contactData,
  projects: projects,
  technologies: technologies,
};

export function usePortfolioData(): PortfolioState {
  const [state, setState] = useState<PortfolioState>({
    data: mockPortfolio,
    loading: isApiEnabled(),
    usingMock: !isApiEnabled(),
    error: null,
  });

  useEffect(() => {
    if (!isApiEnabled()) return;

    let cancelled = false;

    fetchFullPortfolio()
      .then((data) => {
        if (cancelled) return;
        setState({
          data,
          loading: false,
          usingMock: false,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          data: mockPortfolio,
          loading: false,
          usingMock: true,
          error: err instanceof Error ? err.message : "Failed to load data",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}