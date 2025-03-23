import { envConfig } from '@/config';
import { createCipheriv } from '@/imports';

const encryptText = async (text: string): Promise<any> => {
  const algorithm: string = 'AES-256-GCM';

  // generate 16 bytes of random data
  const initVector = envConfig.ENCRYPTION_VECTOR_KEY;

  // secret key generate 32 bytes of random data
  const Securitykey = envConfig.ENCRYPTION_SECURITY_KEY;

  // the cipher function
  const cipher: any = createCipheriv(algorithm, Securitykey, initVector);

  // encrypt the message
  // input encoding
  let encryptedData: any = cipher.update(text, 'utf-8', 'hex');

  encryptedData += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return encryptedData + '.' + BufferToString(authTag);
};
export default encryptText;

const BufferToString = (buffer: Buffer): string => {
  return buffer.toString('base64');
};
