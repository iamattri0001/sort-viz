import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BlocksContext = createContext();

export const BlocksContextProvider = ({ children }) => {
  const blockWidth = 40;
  const blockHeightMultiplier = 50;
  const blockMargin = 2;
  const maxBlockHeight = 10;
  const numberOfBlocks = 20;

  const [elements, setElements] = useState([]);
  const [swapActive, setSwapActive] = useState([]);

  // Initialize the elements array with random heights=
  const createRandomArray = () => {
    const array = Array.from({ length: numberOfBlocks }, () => ({
      id: uuidv4(),
      height: Math.floor(Math.random() * maxBlockHeight) + 1,
    }));
    setElements(array);
  };

  useEffect(() => {
    createRandomArray();
  }, []);

  const swap = (i, j) => {
    return new Promise((resolve) => {
      setElements((prevElements) => {
        const newElements = [...prevElements];
        [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
        resolve(); // Resolve the promise after state update
        return newElements;
      });
    });
  };

  return (
    <BlocksContext.Provider
      value={{
        blockWidth,
        blockHeightMultiplier,
        blockMargin,
        maxBlockHeight,
        elements,
        swap,
        createRandomArray,
        swapActive,
        setSwapActive,
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};

export const useBlocksContext = () => {
  const context = useContext(BlocksContext);
  if (!context) {
    throw new Error("Can't use useBlocksContext outside BlocksContextProvider");
  }
  return context;
};
