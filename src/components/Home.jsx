import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "./Footer";
import { Cover } from "./ui/cover";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { WavyBackground } from "./ui/wavy-background";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import Seo from "./Seo";
import { motion } from "motion/react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

// Define SVG icon components outside of the main component

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const DPIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);

const BacktrackingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
    />
  </svg>
);

const MathIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

// Simplified AlgorithmCategory component without dropdown functionality
const AlgorithmCategory = ({
  title,
  description,
  icon,
  path,
  color,
  algorithms,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate lighter shade of the primary color
  const getLighterColor = (hexColor) => {
    // Remove the # if present
    const hex = hexColor.replace("#", "");

    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Make it lighter
    r = Math.min(255, r + 40);
    g = Math.min(255, g + 40);
    b = Math.min(255, b + 40);

    // Convert back to hex
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const lighterColor = getLighterColor(color);
  const glowColor = color + "40"; // 40 is hex for 25% opacity

  // Determine the link path - direct to first algorithm if available
  const linkPath =
    algorithms.length > 0 ? path.replace(":algorithm", algorithms[0].id) : path;

  return (
    <CardContainer className="h-full">
      <CardBody
        className="bg-slate-800 relative group/card hover:shadow-2xl border-slate-700 border w-auto h-full rounded-xl overflow-visible"
        style={{
          boxShadow: isHovered ? `0 0 20px 5px ${glowColor}` : "none",
        }}
      >
        {/* Add role and tabIndex for accessibility */}
        <div
          className="p-6 cursor-pointer flex-1 flex flex-col h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${color}15, ${lighterColor}30)`
              : "transparent",
          }}
          role="button"
          tabIndex={0}
          aria-label={`Explore ${title}`}
        >
          <CardItem translateZ="40" className="flex items-center mb-4">
            <div
              className={`flex items-center justify-center w-12 h-12 mr-4 text-white rounded-lg transition-all duration-300 ${
                isHovered ? "scale-110" : ""
              }`}
              style={{
                backgroundColor: color,
                boxShadow: isHovered ? `0 0 15px ${color}80` : "none",
              }}
            >
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </CardItem>

          <CardItem translateZ="50" className="flex-grow">
            <p className="mb-6 text-sm text-gray-300 md:text-base">
              {description}
            </p>
          </CardItem>

          <CardItem translateZ="30" className="w-full">
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-700">
              <Link
                to={linkPath}
                className={`text-sm font-medium transition-colors duration-300 flex items-center ${
                  isHovered ? "text-blue-300" : "text-blue-400"
                }`}
              >
                <span>
                  {algorithms.length > 0
                    ? `Try ${algorithms[0].name}`
                    : `Try ${title}`}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5-5 5M5 12h13"
                  />
                </svg>
              </Link>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

// Add PropTypes validation
AlgorithmCategory.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  algorithms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Home = () => {
  const navigate = useNavigate();

  // Sample algorithms for each category

  const searchingAlgorithms = [
    { id: "linear", name: "Linear Search" },
    { id: "binary", name: "Binary Search" },
    { id: "jump", name: "Jump Search" },
    { id: "interpolation", name: "Interpolation Search" },
  ];

  const backtrackingAlgorithms = [{ id: "n-queens", name: "N-Queens" }];

  const mathAlgorithms = [
    { id: "gcd-euclidean", name: "GCD (Euclidean)" },

    { id: "prime-factorization", name: "Prime Factorization" },
  ];

  const categories = [
    {
      title: "Searching Algorithms",
      description:
        "Explore various techniques to find elements in data structures.",
      icon: <SearchIcon />,
      path: "/searching/:algorithm",
      color: "#065F46",
      algorithms: searchingAlgorithms,
    },

    {
      title: "Backtracking",
      description:
        "Explore recursive algorithms that build solutions incrementally and abandon paths that fail to satisfy constraints.",
      icon: <BacktrackingIcon />,
      path: "/backtracking/:algorithm",
      color: "#7E22CE",
      algorithms: backtrackingAlgorithms,
    },

    {
      title: "Mathematical Algorithms",
      description:
        "Implement fundamental mathematical algorithms for computations like prime numbers, GCD and factorization.",
      icon: <MathIcon />,
      path: "/mathematical-algorithms/:algorithm",
      color: "#C2410C",
      algorithms: mathAlgorithms,
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-slate-900">
      <Seo
        title="Algorithm Visualization Platform"
        description="Interactive platform to visualize and learn algorithms through animations. Compare algorithm performances in real-time with Race Mode."
        keywords="algorithm visualization, searching algorithms, data structures "
      />

      <WavyBackground
        containerClassName="w-full min-h-screen absolute inset-0"
        className="relative w-full"
        colors={["#2563eb", "#4f46e5", "#7e22ce", "#a21caf"]}
        waveWidth={50}
        backgroundFill="#0f172a"
        blur={10}
        waveOpacity={0.5}
      />

      <div className="container relative z-10 flex-grow px-4 pt-24 pb-12 mx-auto">
        {/* Hero section without animations */}
        <div className="flex flex-col items-center justify-center flex-1 p-8 mt-20">
          {/* Static heading without motion animations */}
          <Cover>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Visualize Data Structures & Algorithms
            </h1>
          </Cover>

          {/* Static text without motion animations */}
          <TextGenerateEffect
            words="Explore, understand, and master algorithms through interactive visualizations. Compare algorithm performance in real-time with our unique Race Mode."
            className="mt-4 text-center text-gray-300"
          />

          {/* Static button without motion animations */}
        </div>

        {/* Fixed scroll-based animations for algorithm category cards with reduced vertical gaps */}
        <div
          className="grid grid-cols-1 gap-x-4 gap-y-1 mt-16 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto sm:gap-x-5 sm:gap-y-1 lg:mt-24"
          style={{ alignItems: "start" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{
                margin: "-50px 0px",
                amount: 0.2,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.05,
                duration: 0.5,
              }}
              className="h-full mb-1"
            >
              <AlgorithmCategory
                title={category.title}
                description={category.description}
                icon={category.icon}
                path={category.path}
                color={category.color}
                algorithms={category.algorithms}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
