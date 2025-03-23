const generateAssestsURIPrefix = (uri: string) => {
  return process.cwd() + `/src/helpers/assets/${uri}`;
};
export default generateAssestsURIPrefix;
