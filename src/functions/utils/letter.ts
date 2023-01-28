const getLetterPosition = (letter: string): number => {
  return letter.charCodeAt(0) - 97 + 1;
};

const getLetterFromPosition = (position: number): string => {
  return String.fromCharCode(97 + position - 1).toUpperCase();
};

export { getLetterPosition, getLetterFromPosition };
