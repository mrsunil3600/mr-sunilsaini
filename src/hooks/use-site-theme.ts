"use client";

import { useEffect, useState } from "react";

export type SiteTheme = "cyber" | "light";

const getThemeFromDom = (): SiteTheme => {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "cyber";
};

export const useSiteTheme = () => {
  const [theme, setTheme] = useState<SiteTheme>("light");

  useEffect(() => {
    setTheme(getThemeFromDom());

    const observer = new MutationObserver(() => {
      setTheme(getThemeFromDom());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};
