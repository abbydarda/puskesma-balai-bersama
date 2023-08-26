export const generateNoPemeriksaan = (): string => {
  const timestamp = new Date().valueOf().toString();
  const random = Math.random().toString().substring(2, 8);
  return `P-${timestamp}-${random}`;
};
