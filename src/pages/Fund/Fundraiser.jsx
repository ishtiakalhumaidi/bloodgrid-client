import React from "react";
import {
  FaHeart,
  FaUsers,
  FaBullseye,
  FaShieldAlt,
  FaBolt,
  FaAward,
  FaDonate,
  FaHandsHelping,
} from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";


const Fundraiser = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-focus to-primary text-primary-content">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-base-100/20 backdrop-blur-sm rounded-2xl shadow-xl">
                <FaHeart className="w-20 h-20 text-primary-content" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
              Save Lives<br />
              <span className="text-primary-content/90">Together</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-primary-content/90 font-medium leading-relaxed">
              Join our mission to ensure no life is lost due to blood shortage. Every donation brings hope to families in need.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-base-100/15 backdrop-blur-sm rounded-xl px-6 py-6 border border-primary-content/20">
                <div className="text-4xl font-black text-primary-content">10,000+</div>
                <div className="text-sm text-primary-content/80 font-semibold uppercase tracking-wide">Lives Saved</div>
              </div>
              <div className="bg-base-100/15 backdrop-blur-sm rounded-xl px-6 py-6 border border-primary-content/20">
                <div className="text-4xl font-black text-primary-content">500+</div>
                <div className="text-sm text-primary-content/80 font-semibold uppercase tracking-wide">Active Donors</div>
              </div>
              <div className="bg-base-100/15 backdrop-blur-sm rounded-xl px-6 py-6 border border-primary-content/20">
                <div className="text-4xl font-black text-primary-content">24/7</div>
                <div className="text-sm text-primary-content/80 font-semibold uppercase tracking-wide">Emergency Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Your Support Matters */}
      <section className="py-24 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content mb-6">
              Why Your Support Matters
            </h2>
            <p className="text-xl text-base-content/80 max-w-4xl mx-auto font-medium leading-relaxed">
              Blood donation saves lives, but maintaining a reliable supply requires resources, technology, and dedicated teams working around the clock.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-base-100 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300 hover:border-primary/30 hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <FaBullseye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-4">Critical Shortages</h3>
                <p className="text-base-content/70 leading-relaxed">
                  Blood banks face constant shortages, especially during emergencies. We need funds to maintain adequate supplies and reach more donors in underserved areas.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-base-100 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300 hover:border-secondary/30 hover:-translate-y-1">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <FaShieldAlt className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-4">Advanced Equipment</h3>
                <p className="text-base-content/70 leading-relaxed">
                  Modern blood testing, storage, and transportation equipment ensures safety and extends shelf life. Your donations help us invest in life-saving technology.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-base-100 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300 hover:border-accent/30 hover:-translate-y-1">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <FaUsers className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-4">Community Outreach</h3>
                <p className="text-base-content/70 leading-relaxed">
                  We organize mobile blood drives, educational campaigns, and emergency response teams. Funding helps us reach every corner of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Make a Difference */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content mb-6">
              How We Make a Difference
            </h2>
            <p className="text-xl text-base-content/80 max-w-4xl mx-auto font-medium leading-relaxed">
              Our comprehensive blood donation network operates 24/7 to ensure life-saving blood is always available when needed most.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <FaBolt className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-3">Emergency Response</h3>
                  <p className="text-base-content/70 leading-relaxed">Rapid deployment of blood supplies during accidents, disasters, and medical emergencies across the region.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <FaShieldAlt className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-3">Safety First</h3>
                  <p className="text-base-content/70 leading-relaxed">Rigorous testing and screening processes ensure every unit of blood meets the highest safety standards.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <FaUsers className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-3">Community Building</h3>
                  <p className="text-base-content/70 leading-relaxed">Regular blood drives, donor appreciation events, and health education programs strengthen our community.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-14 h-14 bg-neutral/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-neutral/20 transition-colors">
                  <FaAward className="w-7 h-7 text-neutral" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-3">Recognition Programs</h3>
                  <p className="text-base-content/70 leading-relaxed">Honoring regular donors and volunteers who make our life-saving mission possible through their dedication.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-base-200 rounded-3xl shadow-2xl p-10 border border-base-300">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <FaHeart className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-base-content mb-6">Every Drop Counts</h3>
                  <p className="text-base-content/70 mb-8 leading-relaxed text-lg">
                    One donation can save up to three lives. Your financial support helps us collect, process, and distribute life-saving blood to those who need it most.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                      <div className="text-3xl font-black text-primary">1 in 4</div>
                      <div className="text-base-content/70 text-sm font-semibold">People need blood</div>
                    </div>
                    <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20">
                      <div className="text-3xl font-black text-secondary">42 Days</div>
                      <div className="text-base-content/70 text-sm font-semibold">Shelf life</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-focus to-primary text-primary-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Be the Reason Someone<br />
            <span className="text-primary-content/90">Smiles Today</span>
          </h2>
          <p className="text-xl mb-12 text-primary-content/90 font-medium leading-relaxed max-w-3xl mx-auto">
            Your contribution doesn't just fund our operations—it funds hope, healing, and the promise of tomorrow for countless families.
          </p>
          <div className="bg-base-100/15 backdrop-blur-sm rounded-3xl p-10 border border-primary-content/20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black mb-3 text-primary-content">$25</div>
                <div className="text-sm text-primary-content/80 font-semibold uppercase tracking-wide">Processes 1 unit of blood</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-3 text-primary-content">$50</div>
                <div className="text-sm text-primary-content/80 font-semibold uppercase tracking-wide">Supports mobile blood drive</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-3 text-primary-content">$100</div>
                <div className="text-sm text-primary-content/80 font-semibold uppercase tracking-wide">Emergency response kit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-24 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-base-content mb-6">Make Your Contribution</h2>
            <p className="text-xl text-base-content/80 font-medium">
              Every donation, no matter the size, makes a meaningful difference in someone's life.
            </p>
          </div>

          <div className="bg-base-100 rounded-3xl p-10 shadow-xl border border-base-300">
            <CheckoutForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fundraiser;