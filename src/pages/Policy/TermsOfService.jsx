import React from "react";
import {
  FaFileAlt,
  FaUsers,
  FaExclamationTriangle,
  FaBalanceScale,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className=" py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaFileAlt className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Please read these terms carefully before using BloodGrid.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="alert alert-info mb-8">
            <div className="flex items-center gap-2">
              <FaFileAlt className="w-5 h-5" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaBalanceScale className="w-6 h-6 text-primary" />
              Acceptance of Terms
            </h2>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <p className="text-base-content leading-relaxed">
                  By accessing and using the BloodGrid, you accept and agree to
                  be bound by the terms and provision of this agreement. These
                  Terms of Service govern your use of our platform, including
                  all content, services, and products available through the
                  Service.
                </p>
                <div className="alert alert-warning mt-4">
                  <FaExclamationTriangle className="w-5 h-5" />
                  <span>
                    If you do not agree to these terms, you must not use our
                    Service.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* User Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaUsers className="w-6 h-6 text-accent" />
              User Eligibility & Registration
            </h2>

            <div className="space-y-6">
              <div className="card bg-primary text-accent-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Eligibility Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>You must be at least 18 years old</li>
                    <li>
                      You must be legally capable of entering into contracts
                    </li>
                    <li>You must provide accurate and complete information</li>
                    <li>
                      You must be medically eligible to donate blood (for
                      donors)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-primary">
                    Account Registration
                  </h3>
                  <div className="space-y-4">
                    <p>When you create an account, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Provide accurate, current, and complete information
                      </li>
                      <li>Maintain the security of your password</li>
                      <li>
                        Accept responsibility for all activities under your
                        account
                      </li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                    <div className="alert alert-info flex items-center gap-2">
                      <FaShieldAlt className="w-5 h-5" />
                      <span>
                        We use Firebase Authentication with JWT tokens for
                        secure account management.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Roles & Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaHeart className="w-6 h-6 text-primary" />
              User Roles & Responsibilities
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card bg-primary text-error-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Donors 🩸</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Provide accurate health information</li>
                    <li>Follow medical guidelines for donation</li>
                    <li>Respond promptly to donation requests</li>
                    <li>Maintain updated profile information</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-success text-success-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Volunteers 🤝</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Create legitimate donation requests</li>
                    <li>Verify recipient information</li>
                    <li>Coordinate with donors and recipients</li>
                    <li>Maintain ethical standards</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-warning text-warning-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Admins 🌐</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Manage user accounts and permissions</li>
                    <li>Oversee donation request management</li>
                    <li>Monitor content and blog posts</li>
                    <li>Ensure platform security and integrity</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaExclamationTriangle className="w-6 h-6 text-error" />
              Prohibited Activities
            </h2>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <div className="alert alert-error mb-4 flex items-center gap-2">
                  <FaExclamationTriangle className="w-5 h-5" />
                  <span className="font-bold">
                    The following activities are strictly prohibited:
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-error mb-2">
                      Medical & Safety Violations
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Providing false medical information</li>
                      <li>Donating blood when medically ineligible</li>
                      <li>Creating fraudulent donation requests</li>
                      <li>Misrepresenting urgency of requests</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-error mb-2">
                      Platform Misuse
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Creating multiple accounts</li>
                      <li>Sharing account credentials</li>
                      <li>Attempting to hack or breach security</li>
                      <li>Spamming or harassment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Medical Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
              <FaShieldAlt className="w-6 h-6 text-warning" />
              Medical Disclaimers
            </h2>

            <div className="space-y-4">
              <div className="alert alert-warning flex items-center gap-2">
                <FaExclamationTriangle className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">Important Medical Notice</h3>
                  <p>
                    This platform is a connection service only. We do not
                    provide medical advice, diagnosis, or treatment.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-warning">
                    User Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Consult healthcare professionals for medical advice</li>
                    <li>Follow all medical guidelines for blood donation</li>
                    <li>
                      Ensure you meet eligibility criteria before donating
                    </li>
                    <li>Report any adverse reactions immediately</li>
                    <li>
                      Verify recipient and hospital information independently
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy & Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Privacy & Data Protection
            </h2>

            <div className="card bg-primary text-primary-content shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Data Handling</h3>
                <p className="mb-4">
                  Your privacy is important to us. By using our Service, you
                  consent to the collection and use of information in accordance
                  with our Privacy Policy.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>We collect only necessary information for the service</li>
                  <li>We use Firebase for secure authentication</li>
                  <li>We implement industry-standard security measures</li>
                  <li>We do not sell your personal information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Liability & Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Liability & Disclaimers
            </h2>

            <div className="space-y-4">
              <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-error">
                    Limitation of Liability
                  </h3>
                  <p className="mb-4">
                    The Service is provided "as is" without any warranties. We
                    are not liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Medical complications from blood donation</li>
                    <li>Inaccurate information provided by users</li>
                    <li>Failed connections between donors and recipients</li>
                    <li>Third-party actions or omissions</li>
                    <li>Technical failures or service interruptions</li>
                  </ul>
                </div>
              </div>

              <div className="alert alert-error flex items-center gap-2">
                <FaExclamationTriangle className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">Maximum Liability</h3>
                  <p>
                    Our total liability shall not exceed the amount you paid for
                    using the Service (if any).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Account Termination
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-secondary text-secondary-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">By You</h3>
                  <p className="mb-2">
                    You may terminate your account at any time by:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Deleting your account from dashboard</li>
                    <li>Contacting our support team</li>
                    <li>Discontinuing use of the Service</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-accent text-accent-content shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">By Us</h3>
                  <p className="mb-2">We may terminate your account for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Violation of these terms</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Providing false information</li>
                    <li>Harmful behavior to other users</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Changes to Terms
            </h2>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <p className="mb-4">
                  We reserve the right to modify these Terms of Service at any
                  time. We will notify users of any changes by:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Posting the updated terms on this page</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for significant changes</li>
                  <li>Displaying in-app notifications</li>
                </ul>
                <div className="alert alert-info mt-4">
                  <span>
                    Continued use of the Service after changes constitutes
                    acceptance of the new terms.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Contact Information
            </h2>

            <div className="card bg-primary text-primary-content shadow-sm">
              <div className="card-body">
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:legal@bloodgrid.com?subject=Inquiry%20about%20Legal%20Matters&body=Hello%20BloodGrid%20Team%2C%0A%0AI%20have%20a%20question%20regarding%20...">
                      legal@bloodgrid.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> +880-123-456-789
                  </p>
                  <p>
                    <strong>Address:</strong> Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <div className="alert alert-info flex items-center gap-2">
              <FaBalanceScale className="w-5 h-5" />
              <div>
                <h3 className="font-bold">Governing Law</h3>
                <p>
                  These Terms of Service are governed by and construed in
                  accordance with the laws of Bangladesh. Any disputes shall be
                  resolved in the courts of Dhaka, Bangladesh.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
