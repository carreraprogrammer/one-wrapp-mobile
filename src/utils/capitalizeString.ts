const capitalizeString = (str: string): string => {
  const words = str.split(' ') || [];
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(' ');
};

export default capitalizeString;
