const BubbleSort = (elements) => {
  const swaps = [];
  const state = [...elements];
  for (let i = 0; i < elements.length; i++) {
    for (let j = 1; j < elements.length - i; j++) {
      if (state[j].height < state[j - 1].height) {
        swaps.push([j, j - 1]);
        [state[j], state[j - 1]] = [state[j - 1], state[j]];
      }
    }
  }
  return swaps;
};

const SelectionSort = (elements) => {
  const state = [...elements];
  const swaps = [];
  for (let i = state.length - 1; i >= 1; i--) {
    let j = i;
    for (let k = j - 1; k >= 0; k--) {
      if (state[k].height > state[j].height) {
        j = k;
      }
    }
    if (j !== i) {
      swaps.push([j, i]);
      [state[i], state[j]] = [state[j], state[i]];
    }
  }
  return swaps;
};

const InsertionSort = (elements) => {
  const swaps = [];
  const state = [...elements];
  for (let i = 1; i < state.length; i++) {
    const key = state[i];
    let j = i - 1;
    while (j >= 0 && state[j].height > key.height) {
      swaps.push([j + 1, j]);
      state[j + 1] = state[j];
      j--;
    }
    state[j + 1] = key;
  }
  return swaps;
};

const QuickSort = (elements) => {
  const swaps = [];
  const partition = (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (array[j].height <= pivot.height) {
        i++;
        swaps.push([i, j]);
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    swaps.push([i + 1, high]);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  };

  const sort = (array, low, high) => {
    if (low < high) {
      const pi = partition(array, low, high);
      sort(array, low, pi - 1);
      sort(array, pi + 1, high);
    }
  };

  const state = [...elements];
  sort(state, 0, state.length - 1);
  return swaps;
};

const MergeSort = (elements) => {
  const swaps = [];
  const temp = [...elements];

  const merge = (array, left, mid, right) => {
    let i = left;
    let j = mid + 1;
    let k = left;

    while (i <= mid && j <= right) {
      if (temp[i].height <= temp[j].height) {
        array[k] = temp[i];
        i++;
      } else {
        // Record the swap for the visualizer
        swaps.push([i, j]); // This is where the right element will take the position of the left
        array[k] = temp[j];
        j++;
      }
      k++;
    }

    while (i <= mid) {
      array[k] = temp[i];
      i++;
      k++;
    }

    while (j <= right) {
      array[k] = temp[j];
      j++;
      k++;
    }
  };

  const sort = (array, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      sort(array, left, mid);
      sort(array, mid + 1, right);
      merge(array, left, mid, right);
    }
  };

  const state = [...elements]; // Create a copy of the original elements
  sort(temp, 0, temp.length - 1); // Perform the merge sort using temp
  return swaps; // Return the recorded swaps
};

const algorithms = [
  {
    name: "Bubble Sort",
    method: BubbleSort,
  },
  {
    name: "Quick Sort",
    method: QuickSort,
  },
  {
    name: "Selection Sort",
    method: SelectionSort,
  },
  {
    name: "Insertion Sort",
    method: InsertionSort,
  },
  // {
  //   name: "Merge Sort",
  //   method: MergeSort,
  // },
];

export default algorithms;
