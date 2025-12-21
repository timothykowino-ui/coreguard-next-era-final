import { useEffect } from "react";

export default function GlobalStyles() {
  useEffect(() => {
    const id = "coreguard-global-styles";

    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "/styles.css";
      document.head.appendChild(link);
    }
  }, []);

  return null;
}
