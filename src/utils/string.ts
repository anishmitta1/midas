const templateReplace = (templateString: string, options: any): string => {
  let newString = templateString;

  Object.keys(options).forEach((key) => {
    newString = newString.replaceAll(`{${key}}`, options[key]);
  });

  return newString;
};

export { templateReplace };
