// 랜덤 난수 8자리 생성기
export function generate8DigitRandomNumber() {
  const min = 10000000; // Minimum value with 8 digits (10^7)
  const max = 99999999; // Maximum value with 8 digits (10^8 - 1)

  // Generate a random number between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
