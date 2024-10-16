import toast from "react-hot-toast";

export const Visualize = async (
  swap,
  swapOrder,
  setSwapActive,
  delay,
  cancelRef
) => {
  // Create a promise-based approach to handle the delay
  for (const [i, j] of swapOrder) {
    // Check if the visualization was canceled
    if (cancelRef.current) {
      setSwapActive([]); // Clear active swaps

      return; // Exit the function early
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        swap(i, j); // Perform the swap with a delay
        setSwapActive([i, j]); // Highlight the swapped elements
        resolve(); // Proceed to the next step
      }, delay);
    });
  }
  setSwapActive([]); // Clear active swaps after completion
};
