
import { useState } from "react"
import { useInView } from "react-intersection-observer"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Animation hooks for different sections
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [howItWorksRef, howItWorksInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-indigo-800">Crowd-Bank</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                How It Works
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                Benefits
              </a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                Launch App
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              >
                How It Works
              </a>
              <a
                href="#benefits"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              >
                Benefits
              </a>
              <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700">
                Launch App
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`py-20 transition-opacity duration-1000 ease-in-out ${heroInView ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Decentralized</span>
                <span className="block text-indigo-600">Crowdfunding Platform</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Crowdfunding DApp is a revolutionary crowdfunding platform built on blockchain technology, enabling
                transparent and secure fundraising without intermediaries.
              </p>
              <div className="mt-10 sm:flex">
                <div className="rounded-md shadow">
                  <a
                    href="/owner"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                  >
                    Get Started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#how-it-works"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 relative">
              <div className="relative lg:h-96 h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl transform rotate-3 shadow-xl"></div>
                <div className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800">Clean Energy Project</span>
                      </div>
                      <span className="text-indigo-600 font-bold">75% Funded</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>15 ETH raised</span>
                      <span>Goal: 20 ETH</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                        Fund Now
                      </button>
                      <button className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12 shadow-lg animate-pulse">
                <span className="font-bold text-white text-lg">New!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className={`py-16 bg-white transition-transform duration-1000 ease-in-out ${
          featuresInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose Crowd Banking DApp?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform offers unique advantages that traditional crowdfunding can't match.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Decentralized Platform</h3>
                  <p className="mt-2 text-gray-500">
                    Our platform is completely decentralized, eliminating the need for middlemen like banks or agencies.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Smart Contracts</h3>
                  <p className="mt-2 text-gray-500">
                    All transactions are handled through smart contracts on the blockchain, ensuring security and
                    reliability.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Complete Transparency</h3>
                  <p className="mt-2 text-gray-500">
                    Every transaction is recorded on the blockchain, ensuring complete transparency for all
                    participants.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Real-time Tracking</h3>
                  <p className="mt-2 text-gray-500">
                    Donors can view how much funds have been raised and where they are being spent in real-time.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Lower Fees</h3>
                  <p className="mt-2 text-gray-500">
                    Without intermediaries, we can offer significantly lower fees compared to traditional crowdfunding
                    platforms.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Global Reach</h3>
                  <p className="mt-2 text-gray-500">
                    Access funding from anywhere in the world without geographical restrictions or currency conversion
                    issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className={`py-16 bg-gray-50 transition-transform duration-1000 ease-in-out ${
          howItWorksInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How Crowd Bank DApp Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our blockchain-powered platform makes crowdfunding simple, secure, and transparent.
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200 z-0"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-16">
                  {/* Step 1 */}
                  <div className="md:col-start-2 mb-12">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg md:mr-6 mb-4 md:mb-0">
                        1
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <h3 className="text-lg font-medium text-gray-900">Create a Campaign</h3>
                        <p className="mt-2 text-gray-500">
                          Project creators set up their campaign with details, funding goals, and proof of concept.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="md:col-start-1 mb-12">
                    <div className="flex flex-col md:flex-row-reverse items-center">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg md:ml-6 mb-4 md:mb-0">
                        2
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <h3 className="text-lg font-medium text-gray-900">Smart Contract Deployment</h3>
                        <p className="mt-2 text-gray-500">
                          A smart contract is automatically created on the blockchain to manage the campaign funds.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="md:col-start-2 mb-12">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg md:mr-6 mb-4 md:mb-0">
                        3
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <h3 className="text-lg font-medium text-gray-900">Donors Contribute</h3>
                        <p className="mt-2 text-gray-500">
                          Supporters can fund the project using cryptocurrency, with all transactions recorded on the
                          blockchain.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="md:col-start-1 mb-12">
                    <div className="flex flex-col md:flex-row-reverse items-center">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg md:ml-6 mb-4 md:mb-0">
                        4
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <h3 className="text-lg font-medium text-gray-900">Transparent Tracking</h3>
                        <p className="mt-2 text-gray-500">
                          All participants can track the funding progress and see how funds are being utilized in
                          real-time.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="md:col-start-2">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg md:mr-6 mb-4 md:mb-0">
                        5
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <h3 className="text-lg font-medium text-gray-900">Funds Release</h3>
                        <p className="mt-2 text-gray-500">
                          When funding goals are met, the smart contract automatically releases funds to the project
                          creator.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className={`py-16 bg-indigo-700 transition-opacity duration-1000 ease-in-out ${
          statsInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Trusted by Creators Worldwide</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Join thousands of successful projects on our platform.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <p className="text-5xl font-extrabold text-white">$12M+</p>
                <p className="mt-2 text-xl text-indigo-100">Funds Raised</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <p className="text-5xl font-extrabold text-white">1,500+</p>
                <p className="mt-2 text-xl text-indigo-100">Successful Projects</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <p className="text-5xl font-extrabold text-white">25K+</p>
                <p className="mt-2 text-xl text-indigo-100">Active Users</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <p className="text-5xl font-extrabold text-white">100%</p>
                <p className="mt-2 text-xl text-indigo-100">Secure Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`py-20 bg-white transition-transform duration-1000 ease-in-out ${
          ctaInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Ready to start your project?</span>
                    <span className="block">Launch your campaign today.</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-indigo-100">
                    Join our community of innovators and bring your ideas to life with blockchain-powered crowdfunding.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row">
                    <div className="inline-flex rounded-md shadow">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-300"
                      >
                        Create Campaign
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 transition-colors duration-300"
                      >
                        Explore Projects
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:w-1/2 lg:flex-shrink-0 relative">
                  <div className="relative lg:inset-y-0 lg:right-0 lg:w-full">
                    <div className="relative h-64 sm:h-72 md:h-80 lg:h-full">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center">
                        <div className="p-8 text-center">
                          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-indigo-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <p className="text-white text-xl font-semibold">Join 25,000+ users</p>
                          <div className="mt-4 flex -space-x-2 overflow-hidden justify-center">
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://v0.dev/placeholder.svg?height=32&width=32"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://v0.dev/placeholder.svg?height=32&width=32"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://v0.dev/placeholder.svg?height=32&width=32"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://v0.dev/placeholder.svg?height=32&width=32"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://v0.dev/placeholder.svg?height=32&width=32"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold">Crowd Bank DApp</span>
              </div>
              <p className="mt-4 text-gray-400">
                A decentralized crowdfunding platform built on blockchain technology, enabling transparent and secure
                fundraising without intermediaries.
              </p>
              <div className="mt-6 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M18.93 5.34a16.89 16.89 0 00-4.07-1.23c-.03 0-.05.01-.07.03-.17.3-.37.7-.5 1.01a15.72 15.72 0 00-4.57 0c-.14-.32-.34-.7-.52-1.01-.02-.02-.04-.03-.07-.03a16.89 16.89 0 00-4.07 1.23c-.01 0-.02.01-.03.02-2.59 3.8-3.3 7.5-2.95 11.16 0 .02.01.04.03.05a16.95 16.95 0 005.04 2.52c.03 0 .06-.01.07-.03.4-.53.75-1.1 1.05-1.69.02-.04 0-.08-.04-.09-.54-.2-1.06-.45-1.56-.73-.04-.02-.04-.08-.01-.11.1-.08.21-.16.31-.24.02-.01.04-.02.06-.01 3.44 1.54 7.16 1.54 10.55 0 .02-.01.05 0 .06.01.1.08.21.16.32.24.04.03.03.09-.01.11-.5.28-1.02.53-1.56.73-.04.01-.05.06-.04.09.31.59.66 1.16 1.05 1.69.02.02.04.03.07.03a16.9 16.9 0 005.04-2.52c.02-.01.03-.03.03-.05.42-4.27-.73-7.93-2.97-11.16 0-.01-.02-.02-.04-.02zM8.56 14.49c-.99 0-1.81-.9-1.81-2.01 0-1.11.8-2.01 1.81-2.01 1.01 0 1.83.9 1.81 2.01 0 1.11-.8 2.01-1.81 2.01zm6.67 0c-.99 0-1.81-.9-1.81-2.01 0-1.11.8-2.01 1.81-2.01 1.01 0 1.83.9 1.81 2.01 0 1.11-.8 2.01-1.81 2.01z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">&copy; 2025 Crowd Bank DApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}