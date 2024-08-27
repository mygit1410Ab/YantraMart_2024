const onlyNumberAllowed = (value: string): boolean => {
  const regex = /^[0-9\b]+$/;
  return regex.test(value.trim());
};
export {onlyNumberAllowed};
