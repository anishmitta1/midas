const error = (...args: Parameters<typeof console.error>) => {
  console.error(...args);
};

const log = (...args: Parameters<typeof console.log>) => {
  console.log(...args);
};

const warn = (...args: Parameters<typeof console.warn>) => {
  console.warn(...args);
};

export { error, log, warn };
