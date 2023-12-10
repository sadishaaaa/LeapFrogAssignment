/***
 * Levels designed for the game
 */

const level1 = [
  [0, 0, "Y", "Y", "B", "B", 0, 0],
  [0, 0, "Y", "Y", "B", "B", 0],
  [0, 0, "O", "O", "R", "R", 0, 0],
  [0, 0, "O", "O", "R", "R", 0, 0],
];
const level2 = [
  [0, 0, "Y", "Y", "B", "B", 0, 0],
  [0, 0, "Y", "Y", "B", "B", 0],
  [0, 0, "G", "G", "R", "R", 0, 0],
  [0, 0, "G", "G", "R", "R", 0, 0],
  [0, 0, "O", "O", "S", "S", 0],
  [0, 0, "O", "O", "S", "S", 0],
];

const level3 = [
  [0, "B", "Y", "Y", "Y", "Y", "B", 0],
  ["B", "Y", "O", "O", "O", "Y", "B"],
  ["B", "Y", "G", "G", "G", "G", "Y", "B"],
  ["B", "Y", "R", "R", "R", "Y", "B"],
  [0, "B", "Y", "Y", "Y", "Y", "B", 0],
];
const level4 = [
  ["R", "R", "Y", "Y", "B", "B", "G", "G"],
  ["R", "R", "Y", "Y", "B", "B", "G"],
  ["B", "B", "G", "G", "R", "R", "Y", "Y"],
  ["B", "G", "G", "R", "R", "Y", "Y"],
];
const level5 = [
  [0, 0, "R", "Y", "Y", "B", 0, 0],
  [0, "R", "R", "Y", "B", "B", 0],
  [0, "R", "G", "R", "B", "R", "B", 0],
  ["O", "O", "O", "O", "O", "O", "O"],
];

// all levels bassed in one array
const levels = [level1, level2, level3, level4, level5];
