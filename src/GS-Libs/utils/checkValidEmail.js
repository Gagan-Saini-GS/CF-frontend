export const checkValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const domainTLDRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  // Basic structure validation & Domain and TLD validation
  if (!emailRegex.test(email) || !domainTLDRegex.test(email)) return false;

  return true;
};
