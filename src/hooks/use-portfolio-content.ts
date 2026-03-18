"use client";

import { useEffect, useState } from "react";

import { FALLBACK_CONTENT } from "@/data/fallback-content";
import { loadPortfolioContent } from "@/lib/load-portfolio-content";
import { PortfolioContent } from "@/types/portfolio";

export const usePortfolioContent = () => {
  const [content, setContent] = useState<PortfolioContent>(FALLBACK_CONTENT);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      setIsLoading(true);
      const nextContent = await loadPortfolioContent();
      if (isMounted) {
        setContent(nextContent);
        setIsLoading(false);
      }
    };

    void hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    content,
    isLoading
  };
};