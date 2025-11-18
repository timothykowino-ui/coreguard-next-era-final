import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="relative min-h-screen pt-32 pb-20">
        {/* Animated background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-15 blur-3xl animate-glow-pulse"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <h1 className="heading-font text-4xl md:text-5xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-sm text-muted-foreground mb-8">Last Updated: November 2025</p>
            
            <p className="mb-6">
              CoreGuard Mobility ("CoreGuard," "we," "our," or "us") is committed to protecting your personal data in line with the Kenya Data Protection Act, 2019 (DPA) and the regulations issued by the Office of the Data Protection Commissioner (ODPC). This Privacy Policy explains how we collect, use, store, and safeguard your personal data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. What Personal Data We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">A. Information You Provide Directly</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Contact form messages</li>
              <li>Purchase or preorder details</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">B. Information Collected Automatically</h3>
            <p className="mb-4">When you use our site, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address</li>
              <li>Device and browser information</li>
              <li>Site activity data (pages visited, time spent)</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Data</h2>
            <p className="mb-4">We process your data for lawful purposes such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Responding to inquiries and providing customer support</li>
              <li>Processing preorders or purchases</li>
              <li>Sending marketing communications (with consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Legal Basis for Processing (Kenya DPA)</h2>
            <p className="mb-4">Under the Kenya Data Protection Act, we process your personal data based on:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Consent:</strong> Where you have provided explicit consent (e.g., marketing emails)</li>
              <li><strong>Contract:</strong> To fulfill orders or service agreements</li>
              <li><strong>Legitimate Interest:</strong> To improve our products and services, subject to your rights</li>
              <li><strong>Legal Obligation:</strong> To comply with Kenyan laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell your personal data. We may share your data with:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors for hosting, payment processing, and analytics (subject to data protection agreements)</li>
              <li><strong>Legal Requirements:</strong> Authorities if required by Kenyan law or court order</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your data, including encryption, access controls, and secure storage. However, no online system is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights Under the Kenya Data Protection Act</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
              <li><strong>Restrict Processing:</strong> Limit how we use your data in certain situations</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interest or for direct marketing</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p className="mb-4">
              To exercise any of these rights, contact us at <a href="mailto:info@coreguardmobility.com" className="text-primary hover:underline"><strong>info@coreguardmobility.com</strong></a>.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies to enhance your experience. You can control cookies through your browser settings. Refusing cookies may limit some site functionality.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party sites. We are not responsible for their privacy practices. Please review their policies before sharing data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Data Retention</h2>
            <p className="mb-4">
              We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by Kenyan law. Data no longer needed will be securely deleted.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. International Data Transfers</h2>
            <p className="mb-4">
              If data is transferred outside Kenya, we ensure appropriate safeguards are in place, such as standard contractual clauses or adequacy decisions, in line with ODPC guidelines.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Children's Privacy</h2>
            <p className="mb-4">
              Our services are not directed at children under 18. We do not knowingly collect data from minors without parental consent. If you believe we have collected such data, please contact us.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Please review periodically.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Us</h2>
            <p className="mb-4">
              For questions or to exercise your rights, contact us at:
            </p>
            <p className="mb-2"><strong>CoreGuard Mobility</strong></p>
            <p className="mb-2">A product of Grovizhon LLP</p>
            <p className="mb-2">Nairobi, Kenya</p>
            <p className="mb-4">Email: <a href="mailto:info@coreguardmobility.com" className="text-primary hover:underline">info@coreguardmobility.com</a></p>

            <h2 className="text-2xl font-bold mt-8 mb-4">14. Complaints to the Data Protection Commissioner</h2>
            <p className="mb-4">
              If you believe your data protection rights have been violated, you may lodge a complaint with the Office of the Data Protection Commissioner of Kenya:
            </p>
            <p className="mb-2"><strong>Office of the Data Protection Commissioner</strong></p>
            <p className="mb-2">NHIF Building, 10th Floor, Ngong Road</p>
            <p className="mb-2">P.O. Box 3362-00506</p>
            <p className="mb-2">Nairobi, Kenya</p>
            <p className="mb-2">Email: info@odpc.go.ke</p>
            <p className="mb-4">Website: www.odpc.go.ke</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
