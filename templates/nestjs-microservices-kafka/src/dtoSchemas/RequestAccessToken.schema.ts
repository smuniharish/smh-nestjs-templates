const RequestAccessTokenSchema = {
  type: 'object',
  properties: {
    refreshToken: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['refreshToken'],
};
export default RequestAccessTokenSchema;
