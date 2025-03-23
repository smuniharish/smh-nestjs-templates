import { envConfig } from '@/config';
import { createDecipheriv } from '@/imports';

const decryptText = async (encryptedData: string): Promise<any> => {
  const [encryptedText, authTag]: string[] = encryptedData.split('.');
  const securityKey = envConfig.ENCRYPTION_SECURITY_KEY;
  const initVector = envConfig.ENCRYPTION_VECTOR_KEY;

  const algorithm: string = 'AES-256-GCM';

  // the decipher function
  const decipher: any = createDecipheriv(
    algorithm,
    StringToBuffer(securityKey),
    StringToBuffer(initVector),
  );
  decipher.setAuthTag(StringToBuffer(authTag));
  let decryptedData: any = decipher.update(encryptedText, 'hex', 'utf-8');

  decryptedData += decipher.final('utf8');

  return decryptedData;
};
export default decryptText;

const StringToBuffer = (string: string): Buffer => {
  return Buffer.from(string, 'base64');
};
