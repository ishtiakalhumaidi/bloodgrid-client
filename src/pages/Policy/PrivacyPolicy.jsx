import React from "react";
import {
  FaShieldAlt,
  FaEye,
  FaLock,
  FaDatabase,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShieldAlt className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="alert alert-info mb-8">
            <div className="flex items-center gap-2">
              <FaEye className="w-5 h-5" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaDatabase className="w-6 h-6 text-primary" />
              Information We Collect
            </h2>

            <div className="space-y-6">
              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-primary">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-base-content">
                    <li>Name and contact information (email, phone)</li>
                    <li>Blood group and medical information</li>
                    <li>Location data (district, upazila)</li>
                    <li>Profile picture and avatar</li>
                    <li>Emergency contact details</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-primary">
                    Account Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-base-content">
                    <li>Login credentials (encrypted)</li>
                    <li>Account preferences and settings</li>
                    <li>Donation history and requests</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-primary">
                    Technical Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-base-content">
                    <li>Device information and IP address</li>
                    <li>Browser type and version</li>
                    <li>Usage analytics and performance data</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaLock className="w-6 h-6 text-accent" />
              How We Use Your Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-accent text-accent-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Primary Services</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Connecting donors with recipients</li>
                    <li>Managing donation requests</li>
                    <li>Facilitating blood donations</li>
                    <li>Maintaining user profiles</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-secondary text-secondary-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Communication</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Sending donation notifications</li>
                    <li>Emergency blood requests</li>
                    <li>Service updates and announcements</li>
                    <li>Support and customer service</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaShieldAlt className="w-6 h-6 text-success" />
              Data Protection & Security
            </h2>

            <div className="space-y-4">
              <div className="alert alert-success flex items-center gap-2">
                <FaShieldAlt className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">Firebase Authentication</h3>
                  <p>
                    We use Firebase for secure user authentication with JWT
                    tokens.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-success">Security Measures</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-2">
                      <li>End-to-end encryption for sensitive data</li>
                      <li>Regular security audits and updates</li>
                      <li>Secure data transmission (HTTPS)</li>
                      <li>Access controls and authentication</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Regular backup and recovery procedures</li>
                      <li>Firewall and intrusion detection</li>
                      <li>Staff training on data protection</li>
                      <li>Compliance with data protection laws</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Data Sharing & Disclosure
            </h2>

            <div className="alert alert-warning mb-6">
              <div>
                <h3 className="font-bold">Important Note</h3>
                <p>
                  We do not sell or rent your personal information to third
                  parties.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">
                    We may share information only in these cases:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-base-content">
                    <li>With your explicit consent</li>
                    <li>For emergency medical situations</li>
                    <li>To comply with legal requirements</li>
                    <li>
                      With trusted service providers (under strict agreements)
                    </li>
                    <li>To protect rights, safety, or property</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Your Rights & Choices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-primary text-primary-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Access & Control</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>View your personal information</li>
                    <li>Update your profile anytime</li>
                    <li>Download your data</li>
                    <li>Delete your account</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-accent text-accent-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Communication Preferences</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Opt-out of notifications</li>
                    <li>Choose communication channels</li>
                    <li>Set privacy preferences</li>
                    <li>Manage consent settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Contact Us
            </h2>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <p className="text-base-content mb-4">
                  If you have any questions about this Privacy Policy or how we
                  handle your data, please contact us:
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="w-5 h-5 text-primary" />
                    <a className="hover:underline" href="mailto:privacy@bloodgrid.com?subject=Privacy%20Inquiry&body=Hello%2C%20I%20have%20a%20question...">
                      privacy@bloodgrid.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="w-5 h-5 text-primary" />
                    <span>+880-123-456-789</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Changes */}
          <section className="mb-12">
            <div className="alert alert-info">
              <div>
                <h3 className="font-bold">Policy Changes</h3>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
