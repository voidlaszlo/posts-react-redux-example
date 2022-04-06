export const splitStringAtSpace = (string: string | undefined): string[] => {
  if (string === undefined) {
    return [];
  }

  return string.split(" ");
};

export const getFirstChars = ([first, second]: string[]): string => {
  return `${first.charAt(0)}${second.charAt(0)}`;
};
