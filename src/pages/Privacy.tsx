import React, { useEffect } from "react";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {/* Floating local header */}
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background px-6 py-4 flex justify-between items-center shadow-sm">
        <a href="/" className="text-lg font-semibold tracking-tight hover:underline">
          CoreGuard Mobility
        </a>
        <a href="/" className="text-sm text-muted-foreground hover:text-primary underline">
          ← Back
        </a>
      </div>

      <main className="pt-20 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-orbitron mb-6">Privacy Policy</h1>

        <p className="mb-4">
          CoreGuard Mobility is committed to protecting your personal data and
          upholding your privacy rights under the <strong>Data Protection Act,
          2019 (Kenya)</strong>.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">1. Data Collection</h2>
        <p className="mb-4">
          We collect personal information that is necessary to provide our
          services effectively, including name, email, and interaction
          preferences. Data is collected lawfully, fairly, and transparently in
          accordance with Section 28 of the Data Protection Act, 2019.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">2. Purpose of Processing</h2>
        <p className="mb-4">
          Personal data is processed only for specified, explicit, and legitimate
          purposes, including sending newsletters, improving our services, and
          complying with legal obligations (Section 29, Data Protection Act, 2019).
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">3. Data Sharing & Third Parties</h2>
        <p className="mb-4">
          We do not sell or share personal data with third parties except as
          necessary for service delivery or as required by law. All sharing is
          compliant with Sections 34–36 of the Data Protection Act, 2019.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Data Security</h2>
        <p className="mb-4">
          We implement reasonable technical and organizational measures to protect
          personal data against unauthorized access, alteration, disclosure, or
          destruction (Section 33, Data Protection Act, 2019).
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, and request deletion of your
          personal data. You may also object to processing or request data
          portability (Sections 19–26, Data Protection Act, 2019). You can{" "}
          <a href="#footer-email" className="underline hover:text-primary">
            contact us
          </a>{" "}
          to exercise these rights.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">6. Data Protection Authority</h2>
        <p className="mb-4">
          The office responsible for privacy oversight in Kenya is the
          <strong> Office of the Data Protection Commissioner</strong>:
        </p>
        <p className="mb-4">
          Address: Kenya Revenue Authority Towers, Nairobi, Kenya<br />
          Email: <a href="mailto:info@odpc.go.ke" className="underline hover:text-primary" id="footer-email">info@odpc.go.ke</a><br />
          Phone: +254 20 221 0000
        </p>
      </main>

      <Footer />
    </>
  );
};

export default Privacy;
