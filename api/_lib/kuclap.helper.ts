const getColorHash = (inputString: String) => {
  let sum: number = 0;
  for (let i in inputString) {
    sum += inputString.charCodeAt(Number(i));
  }
  let hex: string = "#";
  hex += `00${(~~(
    Number(
      `0.${Math.sin(sum + 1)
        .toString()
        .substr(6)}`
    ) * 256
  )).toString(16)}`
    .substr(-2, 2)
    .toUpperCase();
  hex += `00${(~~(
    Number(
      `0.${Math.sin(sum + 2)
        .toString()
        .substr(6)}`
    ) * 256
  )).toString(16)}`
    .substr(-2, 2)
    .toUpperCase();
  hex += `00${(~~(
    Number(
      `0.${Math.sin(sum + 3)
        .toString()
        .substr(6)}`
    ) * 256
  )).toString(16)}`
    .substr(-2, 2)
    .toUpperCase();
  return hex;
};

export { getColorHash };
