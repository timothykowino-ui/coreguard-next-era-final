import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const Terms = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {/* Floating local header */}
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="text-lg font-semibold tracking-tight hover:underline">
          CoreGuard Mobility
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary underline">
          ← Back
        </Link>
      </div>

      <main className="pt-20 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-orbitron mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to CoreGuard Mobility. By accessing and using our services, you
          agree to comply with these Terms and Conditions and all applicable
          laws of Kenya.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">Use of Services</h2>
        <p className="mb-4">
          Users may access and utilize our services only for lawful purposes.
          All interactions with this site should respect the rights of others
          and the integrity of the website.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">Intellectual Property</h2>
        <p className="mb-4">
          All content, trademarks, logos, designs, and proprietary material on
          this website are the property of CoreGuard Mobility unless otherwise
          stated. Reproduction or distribution without explicit permission is
          prohibited.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">Data Protection & Privacy</h2>
        <p className="mb-4">
          We are committed to protecting your personal data in compliance with the{" "}
          <strong>Data Protection Act, 2019 (Kenya)</strong>. Please review our{" "}
          <Link to="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>{" "}
          for detailed information about how we collect, process, and store your data.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">Contact</h2>
        <p className="mb-4">
          For any inquiries or clarifications regarding these Terms, please{" "}
          <a href="#footer-email" className="underline hover:text-primary">
            contact us
          </a>.
        </p>
      </main>

      <Footer />
    </>
  );
};

export default Terms;
