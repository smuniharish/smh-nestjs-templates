const checkProductionEnv = (productionValue: any, otherEnvValue: any) => {
  return process.env.NODE_ENV === 'production'
    ? productionValue
    : otherEnvValue;
};
export default checkProductionEnv;
