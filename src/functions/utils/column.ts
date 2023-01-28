import { getLetterPosition } from './letter';

const colToColNumber = (excelCol: string): number => {
  let baseTenValue = 0;
  let letterLength = excelCol.length;
  for (let i = letterLength; i > 0; i--) {
    const character = excelCol[i - 1];
    const letterPosition = getLetterPosition(character.toLowerCase());
    baseTenValue += letterPosition * 26 ** (letterLength - i);
  }

  return baseTenValue;
};

const colNumberToCol = (value: number): string => {
  const ordA = 'a'.charCodeAt(0);
  const ordZ = 'z'.charCodeAt(0);
  const len = ordZ - ordA + 1;

  let s = '';
  while (value >= 0) {
    s = String.fromCharCode((value % len) + ordA).toUpperCase() + s;
    value = Math.floor(value / len) - 1;
  }
  return s;
};

const nextCol = (excelCol: string): string => {
  const finalValue = colToColNumber(excelCol);
  const finalCol = colNumberToCol(finalValue);

  return finalCol;
};

export { nextCol, colToColNumber };
