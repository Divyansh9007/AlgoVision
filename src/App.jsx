import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "./components/Layout";
import Home from "./components/Home";

import SearchVisualizer from "./components/searching/SearchVisualizer";

import BacktrackingVisualizer from "./components/backtracking/BacktrackingVisualizer";

import MathVisualizer from "./components/mathematical/MathVisualizer";
import ErrorBoundary from "./components/ErrorBoundary";

import Faq from "./components/FAQ"; // Add this import

const App = () => {
  // Enhanced structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Algorithm Arena",
    description:
      "Interactive platform to visualize and understand algorithms through animations and step-by-step explanations",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Divyansh Pansari",
    },
    keywords:
      "algorithms, data structures, visualization, sorting, dynamic programming, educational tool",
    url: "https://algo-vision-flax.vercel.app/",
    softwareVersion: "1.0.0",
  };

  return (
    <div className="flex flex-col w-screen">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>
          Algorithm Arena - Interactive Algorithm Visualization Platform
        </title>
        <meta
          name="description"
          content="Visualize and learn algorithms through interactive animations. Compare algorithm performance in real-time with our unique Race Mode."
        />
        <meta
          name="keywords"
          content="algorithm visualization, sorting algorithms, searching algorithms, data structures, computer science, educational tool"
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Algorithm Arena - Interactive Visualization"
        />
        <meta
          property="og:description"
          content="Learn algorithms through interactive visualizations and real-time comparisons."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://algo-vision-flax.vercel.app/"
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Algorithm Arena" />
        <meta
          name="twitter:description"
          content="Interactive algorithm visualization platform for educational purposes."
        />
        <meta name="twitter:image" content="/twitter-image.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://algo-vision-flax.vercel.app/" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="searching/:algorithm" element={<SearchVisualizer />} />

            <Route
              path="backtracking/:algorithm"
              element={<BacktrackingVisualizer />}
            />

            <Route
              path="mathematical-algorithms/:algorithm"
              element={<MathVisualizer />}
            />

            <Route path="faq" element={<Faq />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
