import { ALPHABET_SET, NUMBER_SET } from "./Constant";
export function getRandomString(length: number): string {
  const characterset = ALPHABET_SET + NUMBER_SET;
  let output = "";
  for (let i = 0; i < length; i++) {
    output += characterset.charAt(
      Math.floor(Math.random() * characterset.length)
    );
  }
  return output;
}
