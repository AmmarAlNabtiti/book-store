export const isAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/verify-token`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      localStorage.removeItem('token');
      console.log('error');

      return false;
    }
  } catch (error) {
    localStorage.removeItem('token');
    console.log(error, 'error');
    return false;
  }
};
