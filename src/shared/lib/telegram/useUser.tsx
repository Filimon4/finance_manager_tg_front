const useUser = () => {
  return window.Telegram.WebApp.initDataUnsafe?.user;
};

export default useUser;
