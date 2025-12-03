export type LoadHubspotOptions = {
  portalId: string;
  formId: string;
  region?: string;
  targetSelector?: string;
};

export function loadHubspot({
  portalId,
  formId,
  region = "eu1",
  targetSelector = "#newsletter-hs-form",
}: LoadHubspotOptions): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const src = `https://js-${region}.hsforms.net/forms/embed/${portalId}.js`;

  const win = window as any;
  win.__hubspot_loader = win.__hubspot_loader || {};

  if (win.__hubspot_loader[src]) {
    return win.__hubspot_loader[src];
  }

  win.__hubspot_loader[src] = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);

    const createFormOnceReady = () => {
      try {
        const hbspt = (window as any).hbspt;
        if (hbspt && hbspt.forms && typeof hbspt.forms.create === "function") {
          hbspt.forms.create({
            portalId,
            formId,
            region,
            target: targetSelector,
          });
          resolve();
          return;
        }

        let tries = 0;
        const t = setInterval(() => {
          tries += 1;
          if ((window as any).hbspt && (window as any).hbspt.forms && typeof (window as any).hbspt.forms.create === "function") {
            clearInterval(t);
            (window as any).hbspt.forms.create({
              portalId,
              formId,
              region,
              target: targetSelector,
            });
            resolve();
          } else if (tries > 50) {
            clearInterval(t);
            reject(new Error("HubSpot API not available after script load"));
          }
        }, 100);
      } catch (err) {
        reject(err as Error);
      }
    };

    if (existing) {
      createFormOnceReady();
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    s.async = true;
    s.onload = createFormOnceReady;
    s.onerror = () => reject(new Error("Failed to load HubSpot script"));
    document.head.appendChild(s);
  });

  return win.__hubspot_loader[src];
}