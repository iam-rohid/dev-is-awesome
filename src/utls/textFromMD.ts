import { remark } from "remark";
import strip from "strip-markdown";

const textFromMD = async (md: string) => {
  const text = await remark().use(strip).process(md);
  return String(text);
};

export default textFromMD;
