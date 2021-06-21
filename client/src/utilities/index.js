export const generateTokenConfig = () => {
  const config = {
    headers: { token: localStorage.token },
  };
  return config;
};
