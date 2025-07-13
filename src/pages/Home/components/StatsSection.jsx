import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaHeartbeat,
  FaUserFriends,
  FaHandsHelping,
  FaCalendarCheck,
} from "react-icons/fa";
import useCurrentDateTime from "../../../hooks/useCurrentDateTime";

const StatsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();
  const dateTime = useCurrentDateTime();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const statVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const stats = [
    {
      icon: FaHeartbeat,
      count: "10K+",
      label: "Blood Donations",
      description: "Life-saving donations completed",
      color: "from-red-500/20 to-red-600/20",
    },
    {
      icon: FaUserFriends,
      count: "50K+",
      label: "Active Donors",
      description: "Registered blood donors",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: FaHandsHelping,
      count: "100+",
      label: "Partner Organizations",
      description: "Healthcare partners nationwide",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      icon: FaCalendarCheck,
      count: dateTime,
      label: "Last Updated",
      description: "Real-time statistics",
      color: "from-purple-500/20 to-purple-600/20",
    },
  ];

  return (
    <section className="py-16 bg-base-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-48 -right-48"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-4"
        onViewportEnter={() => setIsInView(true)}
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-6"
          >
            Our{" "}
            <span className="text-primary relative">
              Impact
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
            </span>{" "}
            in Numbers
          </motion.h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Together we're making a difference. Every donation counts, every
            life matters. Updated in real-time as of {dateTime}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              className="relative group"
            >
              <div
                className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color}
                transform group-hover:scale-105 transition-transform duration-500
              `}
              ></div>

              <div className="relative bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-500">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.count}
                    </div>
                    <div className="font-semibold text-base-content">
                      {stat.label}
                    </div>
                    <p className="text-sm text-base-content/70 mt-2">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
