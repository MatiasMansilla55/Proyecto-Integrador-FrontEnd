export const saveUserToLocalStorage = (user) => {
  try {
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
  } catch (error) {
    console.error("Error saving user to localStorage", error);
  }
};
