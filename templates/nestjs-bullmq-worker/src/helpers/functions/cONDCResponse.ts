const cONDCResponse = (
  context: object,
  messageStatus: string,
  errors?: any,
) => {
  const messageJson = {
    context: context,
    message: {
      ack: {
        status: messageStatus,
      },
    },
  };
  const errorJson = errors && {
    error: errors,
  };
  const response = {
    ...messageJson,
    ...errorJson,
  };
  return response;
};
export default cONDCResponse;
