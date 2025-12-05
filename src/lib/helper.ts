import * as crypto from "crypto";

export function generateCustomCode(length: number) {
  if (length <= 0) return "";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += crypto.randomInt(0, 10).toString();
  }
  return code;
}
