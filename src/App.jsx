import React, { useState, useRef } from "react";
import Blocks from "./components/Blocks";
import { useBlocksContext } from "./contexts/BlocksContext";
import { Visualize } from "./utils/visualizer";
import algorithms from "./utils/algorithms";
import toast from "react-hot-toast";

const App = () => {
  const { swap, elements, createRandomArray, setSwapActive } =
    useBlocksContext();

  const [delay, setDelay] = useState(500);
  const [algo, setAlgo] = useState(algorithms[0]);
  const [isVisualizing, setIsVisualizing] = useState(false); // Track visualization state
  const cancelRef = useRef(false); // Track cancellation

  const handleSort = async () => {
    cancelRef.current = false; // Reset cancel flag
    setIsVisualizing(true); // Start visualization
    const swapOrder = algo.method(elements);

    if (swapOrder.length === 0) {
      // Only show "Sorted" toast if not canceled
      toast.success("Already Sorted!", {
        icon: "❗",
        style: {
          borderRadius: "16px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      await Visualize(swap, swapOrder, setSwapActive, delay, cancelRef);
      if (!cancelRef.current) {
        toast.success("Sorting complete!", {
          icon: "✅",
          style: { borderRadius: "16px", background: "#333", color: "#fff" },
        });
      }
    }
    setIsVisualizing(false); // End visualization
  };

  const handleCancel = () => {
    cancelRef.current = true; // Set cancel flag
    setSwapActive([]); // Clear active swaps
    toast.error("Visualization canceled", {
      icon: "❌",
      style: { borderRadius: "16px", background: "#333", color: "#fff" },
    });
    setIsVisualizing(false); // Stop visualization
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-4">
      <Blocks />
      <div className="flex gap-x-3">
        <select
          className={`text-slate-900 ${
            isVisualizing ? `opacity-25 pointer-events-none` : ""
          } `}
          defaultValue={algorithms[0].name}
          onChange={(e) =>
            setAlgo(algorithms.find((algo) => algo.name === e.target.value))
          }
        >
          {algorithms.map((algo) => (
            <option key={algo.name} value={algo.name}>
              {algo.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <span className="text-xs ">Delay: {delay}ms</span>
          <input
            type="range"
            min={20}
            max={2000}
            step={100}
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className={`${
              isVisualizing ? `opacity-25 pointer-events-none` : ``
            }`}
          />
        </div>

        <button
          onClick={handleSort}
          disabled={isVisualizing}
          className={`px-4 py-2 rounded transition-colors ${
            isVisualizing
              ? "bg-gray-400"
              : "bg-neutral-500 hover:bg-neutral-600"
          }`}
        >
          {isVisualizing ? "Sorting..." : "Sort"}
        </button>

        <button
          onClick={handleCancel}
          disabled={!isVisualizing}
          className={`px-4 py-2 rounded transition-colors ${
            isVisualizing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 opacity-70"
          }`}
        >
          Cancel
        </button>

        <button
          onClick={createRandomArray}
          disabled={isVisualizing}
          className={`px-4 py-2 rounded bg-neutral-500 hover:bg-neutral-600 ${
            isVisualizing ? `opacity-25 pointer-events-none` : ``
          }`}
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default App;
