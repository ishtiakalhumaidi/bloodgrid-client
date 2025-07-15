import React from "react";
import {
  FaHeartbeat,
  FaUsers,
  FaHandsHelping,
  FaGlobeAsia,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import aboutImg from "../assets/images/aboutus.svg";

const AboutUs = () => {
    
  return (
    <section className="min-h-screen bg-base-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 items-center">
        {/* Left: Illustration */}
        <div className="flex justify-center">
          <img
            src={aboutImg}
            alt="About BloodGrid"
            className="w-full max-w-xs rounded-lg shadow-md"
          />
        </div>

        {/* Right: Content */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
            About <span className="text-primary">BloodGrid</span>
          </h1>
          <p className="text-base-content/80 text-lg mb-8 leading-relaxed">
            BloodGrid is a transformative blood donation platform dedicated to bridging the gap between blood donors and recipients across Bangladesh. Launched with the mission to address the critical blood shortage in the country, where approximately 800,000 bags of blood are needed annually, BloodGrid leverages technology to make blood donation accessible, efficient, and secure. Our platform connects verified voluntary donors with those in urgent need, ensuring safe and timely blood transfusions to save lives.[](https://blood.quantummethod.org.bd/en)
          </p>
          <p className="text-base-content/80 text-lg mb-8 leading-relaxed">
            Inspired by the spirit of humanity and the urgent need for safe blood, as highlighted by organizations like the Bangladesh Red Crescent Society, BloodGrid is committed to promoting voluntary blood donation over reliance on paid donors. We aim to create a community-driven ecosystem that empowers individuals to contribute to a noble cause while ensuring recipients receive safe, screened blood.[](https://bdrcs.org/donate-blood/)
          </p>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <FaHeartbeat className="text-primary text-2xl mt-1" />
              <div>
                <strong className="font-semibold text-base-content">Life-Saving Mission:</strong>
                <p className="text-base-content/80">
                  Our vision is to eliminate blood shortages in Bangladesh by making blood donation seamless and accessible. We strive to ensure that no patient suffers due to a lack of blood, supporting critical cases like thalassemia, dengue, and emergency surgeries.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaUsers className="text-accent text-2xl mt-1" />
              <div>
                <strong className="font-semibold text-base-content">Trusted Donor Community:</strong>
                <p className="text-base-content/80">
                  Every donor on BloodGrid is thoroughly verified to ensure safety and reliability. We follow strict screening protocols aligned with international standards, testing for infections like HIV, HBsAg, HCV, syphilis, and malaria, ensuring only safe blood reaches patients.[](https://bdspecializedhospital.com/department/bshl-blood-bank)
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaHandsHelping className="text-secondary text-2xl mt-1" />
              <div>
                <strong className="font-semibold text-base-content">Volunteer Support:</strong>
                <p className="text-base-content/80">
                  Our dedicated team of volunteers works tirelessly to manage blood requests, coordinate with donors, and support emergency cases. From organizing blood drives to providing real-time assistance, our volunteers are the backbone of BloodGrid’s operations.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaGlobeAsia className="text-primary text-2xl mt-1" />
              <div>
                <strong className="font-semibold text-base-content">Nationwide Network:</strong>
                <p className="text-base-content/80">
                  With a presence in every district and upazila of Bangladesh, BloodGrid ensures help is always nearby. Our platform connects donors and recipients through an automated system, enabling rapid response to blood requests via SMS and app notifications, similar to innovations seen in platforms like Rokto and BloodLine.[](https://www.rokto.co/)[](https://play.google.com/store/apps/details?id=com.sandhani.badhan.bloodbankbd&hl=en)
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaShieldAlt className="text-accent text-2xl mt-1" />
              <div>
                <strong className="font-semibold text-base-content">Secure and Automated:</strong>
                <p className="text-base-content/80">
                  BloodGrid employs advanced security measures, including encryption and access controls, to protect donor and recipient data. Our 100% automated platform streamlines scheduling, blood testing, and availability updates, ensuring efficiency and transparency.[](https://bloodcare.pathwaybd.org/)
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaClock className="text-secondary text-2xl mt-1" />
              <div>
                <strong className="font-semibold text-base-content">24/7 Availability:</strong>
                <p className="text-base-content/80">
                  BloodGrid operates round-the-clock to meet urgent needs, providing blood products like platelets and fresh frozen plasma for critical cases, such as dengue outbreaks or burn victims, as seen in our collaboration with local hospitals.[](https://bdrcs.org/blood-program/)
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-base-content mb-4">
              Our Impact
            </h3>
            <p className="text-base-content/80 text-lg leading-relaxed">
              Since our inception, BloodGrid has facilitated thousands of successful blood donations, saving countless lives. We partner with hospitals, NGOs, and government initiatives to strengthen Bangladesh’s blood transfusion services, aligning with national efforts to upgrade blood centers to state-of-the-art facilities. Our platform also raises awareness about voluntary blood donation, inspiring a culture of altruism and community support across the nation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;