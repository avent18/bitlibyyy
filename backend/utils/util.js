const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encode = (num)=>{
  let short = "";
  while (num > 0) {
    short = chars[num % 62] + short;
    num = Math.floor(num / 62);
  }
  return short;
}

