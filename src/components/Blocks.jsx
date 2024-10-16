import React from "react";
import { motion } from "framer-motion";
import { useBlocksContext } from "../contexts/BlocksContext";

const Blocks = () => {
  const {
    elements,
    blockWidth,
    blockHeightMultiplier,
    blockMargin,
    swapActive,
    maxBlockHeight
  } = useBlocksContext();

  return (
    <div
      className="relative flex items-end mx-auto gap-x-2"
      style={{
        width: `${(blockWidth + blockMargin) * elements.length}px`,
        height: `${
          maxBlockHeight * blockHeightMultiplier
        }px`,
      }}
    >
      {elements.map((element, index) => (
        <motion.div
          key={element.id}
          layout // Framer Motion's layout animation
          initial={{ opacity: 0, y: -100 }} // Animation on initial mount
          animate={{ opacity: 1, y: 0 }} // Animation when rendered
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth animation
          style={{
            height: `${element.height * blockHeightMultiplier}px`,
            width: `${blockWidth}px`,
          }}
          className={`bottom-0 text-transparent rounded-t-full ${
            swapActive.indexOf(index) !== -1 ? `bg-red-300` : `bg-lime-400`
          }`}
          aria-label={`Block height: ${element.height}`}
        >
          {element.height}
        </motion.div>
      ))}
    </div>
  );
};

export default Blocks;
