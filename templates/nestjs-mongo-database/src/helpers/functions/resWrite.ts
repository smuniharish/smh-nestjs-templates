const resWrite = (
  res: any,
  chunks: any,
  chunkBuffers: any,
  rawResponse: any,
) => {
  const resArgs: any[] = [];
  for (let i = 0; i < chunks.length; i++) {
    resArgs[i] = chunks[i];
    if (!resArgs[i]) {
      res.once('drain', res.write);
    }
  }
  if (resArgs[0]) {
    chunkBuffers.push(Buffer.from(resArgs[0]));
  }
  return rawResponse.apply(res, resArgs);
};
export default resWrite;
