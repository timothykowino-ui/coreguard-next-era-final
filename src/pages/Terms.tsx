import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Terms = () => {
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
            Terms of Service
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-sm text-muted-foreground mb-8">Last Updated: November 2025</p>
            
            <p className="mb-6">
              Welcome to CoreGuard Mobility ("CoreGuard," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, digital content, and related services ("Services"). By using our Services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Use of Our Services</h2>
            <p className="mb-4">
              You agree to use the Services in accordance with Kenyan law, including the Computer Misuse and Cybercrimes Act and the Kenya Data Protection Act where applicable. You may not misuse the website, attempt unauthorized access, or engage in activity that may disrupt our systems.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property</h2>
            <p className="mb-4">
              All content, including text, images, logos, designs, and trademarks, are owned by CoreGuard Mobility or licensed to us. You may not reproduce, distribute, or create derivative works without prior written permission.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Post harmful, defamatory, or unlawful content</li>
              <li>Use the website to spread malware or phishing attempts</li>
              <li>Infringe on the rights of others</li>
              <li>Engage in fraudulent or deceptive activity</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
            <p className="mb-4">
              CoreGuard Mobility is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Services, including but not limited to data loss, system downtime, or business interruptions. Our liability is limited to the maximum extent permitted by Kenyan law.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not guarantee uninterrupted access, error-free operation, or security from unauthorized access.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless CoreGuard Mobility, its affiliates, and partners from any claims, damages, or legal costs arising from your violation of these Terms or misuse of the Services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party sites. We are not responsible for their content or practices. Please review their terms and privacy policies before engaging with them.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Modification of Terms</h2>
            <p className="mb-4">
              We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of the Services after changes are posted constitutes acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Termination</h2>
            <p className="mb-4">
              We may suspend or terminate your access to the Services if you violate these Terms or engage in harmful activity. You may also stop using the Services at any time.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by the laws of the Republic of Kenya. Any disputes arising from these Terms or the Services will be subject to the exclusive jurisdiction of Kenyan courts.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Privacy</h2>
            <p className="mb-4">
              Your use of the Services is also governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your personal data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Information</h2>
            <p className="mb-4">
              For questions or concerns about these Terms, contact us at:
            </p>
            <p className="mb-2"><strong>CoreGuard Mobility</strong></p>
            <p className="mb-2">A product of Grovizhon LLP</p>
            <p className="mb-2">Nairobi, Kenya</p>
            <p className="mb-4">Email: <a href="mailto:info@coreguardmobility.com" className="text-primary hover:underline">info@coreguardmobility.com</a></p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">14. Entire Agreement</h2>
            <p className="mb-4">
              These Terms, along with our Privacy Policy, constitute the entire agreement between you and CoreGuard Mobility regarding the use of our Services.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Terms;
