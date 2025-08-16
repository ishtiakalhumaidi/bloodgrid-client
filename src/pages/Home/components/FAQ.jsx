import React from "react";
import { motion } from "framer-motion";
import { FiHelpCircle, FiUsers, FiShield, FiHeart } from "react-icons/fi";

const FAQ = () => {
  const faqData = [
    {
      category: "General",
      icon: FiHelpCircle,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Join as a Donor' button on the homepage and follow the registration process. You'll need to provide basic information including your blood type, location, and contact details."
        },
        {
          question: "Is BloodGrid free to use?",
          answer: "Yes, BloodGrid is completely free for both donors and recipients. Our platform is supported by community donations and partnerships with healthcare organizations."
        },
        {
          question: "How do I search for blood donors?",
          answer: "You can search for donors without creating an account. Simply go to the 'Search Donors' page, select the blood group, district, and upazila to find available donors near you."
        },
        {
          question: "What areas does BloodGrid cover?",
          answer: "BloodGrid covers all districts and upazilas across Bangladesh. Our network is constantly growing with donors from urban and rural areas."
        }
      ]
    },
    {
      category: "Donation Process",
      icon: FiHeart,
      questions: [
        {
          question: "How often can I donate blood?",
          answer: "Healthy adults can donate blood every 56 days (8 weeks). Our system automatically tracks your last donation date to ensure safe donation intervals."
        },
        {
          question: "What are the requirements to become a donor?",
          answer: "You must be 18-65 years old, weigh at least 50kg, be in good health, and not have donated blood in the last 56 days. Certain medical conditions may disqualify you temporarily or permanently."
        },
        {
          question: "How do I create a donation request?",
          answer: "After logging in as a registered donor, go to your dashboard and click 'Create Donation Request'. Fill in the patient details, required blood type, hospital information, and urgency level."
        },
        {
          question: "How quickly can I expect responses to my donation request?",
          answer: "Our platform sends instant notifications to matching donors in your area. Most urgent requests receive responses within 30 minutes to 2 hours."
        }
      ]
    },
    {
      category: "Safety & Privacy",
      icon: FiShield,
      questions: [
        {
          question: "How is my personal information protected?",
          answer: "We use industry-standard encryption and follow strict privacy policies. Your contact information is only shared with verified users during active donation requests."
        },
        {
          question: "How do you verify donors and requests?",
          answer: "All donors undergo phone verification during registration. Donation requests require hospital details and emergency contact information for verification."
        },
        {
          question: "What safety measures are in place during blood donation?",
          answer: "We only connect you with certified hospitals and blood banks. All donations must follow standard medical protocols with proper screening and sterile equipment."
        },
        {
          question: "Can I block or report inappropriate users?",
          answer: "Yes, you can report any suspicious activity or inappropriate behavior. We have a dedicated team that reviews all reports within 24 hours."
        }
      ]
    },
    {
      category: "Platform Features",
      icon: FiUsers,
      questions: [
        {
          question: "How do the live updates work?",
          answer: "Our platform provides real-time updates on donation request status, new requests in your area, and donor availability through web notifications and email alerts."
        },
        {
          question: "Can I track my donation history?",
          answer: "Yes, your dashboard shows a complete history of your donations, including dates, locations, and recipients (with their consent)."
        },
        {
          question: "How does the emergency notification system work?",
          answer: "Critical requests are marked as 'urgent' and sent to all compatible donors within a 50km radius via SMS, email, and push notifications."
        },
        {
          question: "Can I donate money instead of blood?",
          answer: "Yes, you can support our platform through our fundraiser page. Donations help us maintain the platform, verify users, and expand our reach to save more lives."
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-base-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div 
        data-aos="fade-up"
        data-aos-duration="1200"
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Frequently Asked{" "}
            <span className="text-primary relative">
              Questions
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
            </span>
          </h2>
          <p className="text-base md:text-xl text-base-content/80 max-w-2xl mx-auto">
            Everything you need to know about donating blood and using BloodGrid. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-base-content">
                  {category.category}
                </h3>
              </div>

              {/* Category Questions */}
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="collapse collapse-arrow bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-300"
                  >
                    <input 
                      type="radio" 
                      name={`faq-accordion-${categoryIndex}`}
                      defaultChecked={categoryIndex === 0 && faqIndex === 0}
                    />
                    <div className="collapse-title font-semibold text-base-content hover:text-primary transition-colors duration-300">
                      {faq.question}
                    </div>
                    <div className="collapse-content text-sm text-base-content/80 leading-relaxed">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-base-content/70 mb-4">
                Our support team is available 24/7 to help you with any queries about blood donation or using our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@bloodgrid.org"
                  className="btn btn-primary btn-sm"
                >
                  Email Support
                </a>
                <a
                  href="tel:+880123456789"
                  className="btn btn-outline btn-sm"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;