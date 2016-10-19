/**
 * (1, 3)
 * [0]
 * [3]
 * [2]
 * [1]
 * [-]
 * => [0, 3, 2, 1]
 * */
export default (array, i, k) => {
  if (k > 0) {
    return [...array.slice(0, i),
    array[k],
    ...array.slice(i + 1, k),
    array[i],
    ...array.slice(k + 1)];
  }

  return array;
};
