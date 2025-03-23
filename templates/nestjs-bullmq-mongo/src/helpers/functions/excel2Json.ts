import { readFile, utils } from '@/imports';

const excel2Json = (fileURI: string, index: number) => {
  const workbook = readFile(fileURI);
  const sheetName = workbook.SheetNames[index];
  const sheet = workbook.Sheets[sheetName];
  const data = utils.sheet_to_json(sheet);
  return data;
};
export default excel2Json;
