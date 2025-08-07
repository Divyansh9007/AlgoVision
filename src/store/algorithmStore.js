import { create } from "zustand";
import { getSearchAlgorithm } from "../algorithms/searching/index.jsx";

const useAlgorithmStore = create((set, get) => ({
  currentAlgorithm: null,
  currentCategory: null,
  searchQuery: "",
  searchResults: [],
  preventArrayGeneration: false,
  algorithmCategories: {
    Searching: ["Linear Search", "Binary Search"],
    Backtracking: ["N-Queens"],
    "Mathematical Algorithms": ["GCD (Euclidean)", "Prime Factorization"],
  },

  array: [],
  arraySize: (() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) return 16;
    return 36;
  })(),
  defaultArraySize: (() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) return 16;
    return 36;
  })(),

  searchArray: [],
  currentSearchIndex: -1,
  searchTarget: null,
  searchResult: null,
  isSearching: false,
  searchArraySize: window.innerWidth < 640 ? 10 : 15,
  isSearchPlaying: false,
  isSearchPaused: false,

  setArraySize: (size) => {
    set({ preventArrayGeneration: true });

    try {
      const { currentAlgorithm } = get();
      const screenWidth = window.innerWidth;
      let maxSize;
      let minSize;

      if (screenWidth < 640) {
        minSize = 5;
        maxSize = 30;
      } else if (screenWidth < 1024) {
        minSize = 8;
        maxSize = 50;
      } else {
        minSize = 10;
        maxSize = 100;
      }

      const adjustedSize = Math.min(Math.max(size, minSize), maxSize);

      const newArray = Array.from({ length: adjustedSize }, () => {
        const baseHeight =
          screenWidth < 640 ? 20 : screenWidth < 1024 ? 15 : 10;
        return Math.floor(Math.random() * (200 - baseHeight) + baseHeight);
      });

      set({
        array: newArray,
        arraySize: adjustedSize,
        currentSearchIndex: -1,
        isSearching: false,
        isSearchPlaying: false,
        isSearchPaused: false,
        currentAlgorithm,
      });

      return adjustedSize;
    } finally {
      setTimeout(() => {
        set({ preventArrayGeneration: false });
      }, 200);
    }
  },

  generateNewArray: () => {
    if (get().preventArrayGeneration) {
      return get().arraySize;
    }

    const { arraySize } = get();
    const sizeToUse =
      arraySize ||
      (() => {
        const screenWidth = window.innerWidth;
        return screenWidth < 1024 ? 16 : 36;
      })();

    const screenWidth = window.innerWidth;
    let baseHeight;

    if (screenWidth < 640) {
      baseHeight = 20;
    } else if (screenWidth < 1024) {
      baseHeight = 15;
    } else {
      baseHeight = 10;
    }

    const newArray = Array.from({ length: sizeToUse }, () =>
      Math.floor(Math.random() * (200 - baseHeight) + baseHeight)
    );

    set(() => ({
      array: newArray,
      arraySize: sizeToUse,
      currentSearchIndex: -1,
      isSearching: false,
      isSearchPlaying: false,
      isSearchPaused: false,
    }));

    return sizeToUse;
  },

  generateSearchArray: () => {
    const { searchArraySize, currentAlgorithm } = get();
    const newArray = Array.from(
      { length: searchArraySize },
      () => Math.floor(Math.random() * 999) + 1
    );
    const shouldSort = currentAlgorithm?.toLowerCase().includes("binary");
    if (shouldSort) {
      newArray.sort((a, b) => a - b);
    }

    set({
      searchArray: newArray,
      currentSearchIndex: -1,
      searchResult: null,
      searchTarget: null,
      isSearching: false,
      isSearchPlaying: false,
      isSearchPaused: false,
    });
  },

  setCurrentAlgorithm: (algorithm) => {
    const screenWidth = window.innerWidth;
    const defaultSize = screenWidth < 640 ? 15 : screenWidth < 1024 ? 20 : 36;

    set((state) => ({
      ...state,
      currentAlgorithm: algorithm,
      isPaused: false,
      isSearching: false,
      isSearchPlaying: false,
      isSearchPaused: false,
    }));

    set({ preventArrayGeneration: true });

    try {
      set({ arraySize: defaultSize });
      const baseHeight = screenWidth < 640 ? 20 : screenWidth < 1024 ? 15 : 10;
      const newArray = Array.from({ length: defaultSize }, () =>
        Math.floor(Math.random() * (200 - baseHeight) + baseHeight)
      );

      set({
        array: newArray,
        currentSearchIndex: -1,
        isPaused: false,
        isSearching: false,
        isSearchPlaying: false,
        isSearchPaused: false,
      });
    } finally {
      setTimeout(() => {
        set({ preventArrayGeneration: false });
      }, 100);
    }
  },

  searchAlgorithms: (query) => {
    const { algorithmCategories } = get();
    const results = [];
    Object.entries(algorithmCategories).forEach(([category, algorithms]) => {
      algorithms.forEach((algo) => {
        if (algo.toLowerCase().includes(query.toLowerCase())) {
          results.push({ category, name: algo });
        }
      });
    });
    set({ searchResults: results });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSpeed: (speed) => set({ speed, currentSpeed: speed }),

  startSearch: async (target) => {
    const { searchArray, currentAlgorithm } = get();
    if (!currentAlgorithm) return;

    const algorithm = getSearchAlgorithm(
      currentAlgorithm.toLowerCase().replace(/\s+/g, "-")
    );

    if (!algorithm) return;

    set({
      isSearching: true,
      isSearchPlaying: true,
      isSearchPaused: false,
      searchTarget: target,
      searchResult: null,
      currentSearchIndex: -1,
    });

    try {
      const result = await algorithm(
        searchArray,
        parseInt(target),
        (index) => set({ currentSearchIndex: index }),
        () => get().isSearchPlaying,
        () => get().speed
      );

      set({
        searchResult: result !== -1,
        currentSearchIndex: result,
        isSearching: false,
        isSearchPlaying: false,
      });
    } catch (error) {
      console.error("Search error:", error);
      set({ isSearching: false, isSearchPlaying: false });
    }
  },

  pauseSearch: () => set({ isSearchPlaying: false, isSearchPaused: true }),
  resumeSearch: () => set({ isSearchPlaying: true, isSearchPaused: false }),

  setCustomSearchArray: (array) => {
    const processedArray = array.map((num) => Number(num));

    const { currentAlgorithm } = get();
    const shouldSort = currentAlgorithm?.toLowerCase().includes("binary");

    if (shouldSort) {
      processedArray.sort((a, b) => a - b);
    }

    set({
      searchArray: processedArray,
      searchArraySize: processedArray.length,
      currentSearchIndex: -1,
      searchResult: null,
      searchTarget: null,
      isSearching: false,
      isSearchPlaying: false,
      isSearchPaused: false,
    });

    return processedArray.length;
  },

  setSearchArraySize: (size) => {
    set({ searchArraySize: size });
    get().generateSearchArray();
  },

  updateSizeBasedOnScreen: () => {
    const screenWidth = window.innerWidth;
    const defaultSize = screenWidth < 1024 ? 16 : 36;

    set({ defaultArraySize: defaultSize });

    if (!get().isSearching && !get().isSearchPlaying) {
      set({ arraySize: defaultSize });
      get().generateNewArray();
    }
  },

  updateDefaultSizes: () => {
    const screenWidth = window.innerWidth;
    const defaultSize = screenWidth < 1024 ? 16 : 36;
    set({ defaultArraySize: defaultSize });
  },
}));

export default useAlgorithmStore;
