const cResponse = (status: any, data: any, statusCode: number) => {
  return {
    status: status,
    data: data,
    statusCode: statusCode,
  };
};
export default cResponse;
