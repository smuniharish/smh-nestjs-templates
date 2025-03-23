const errorMessageFormatter = (err: any) => {
  if (err.message) {
    return err.message;
  } else if (err.response) {
    return err.response;
  } else {
    return err;
  }
};
export default errorMessageFormatter;
