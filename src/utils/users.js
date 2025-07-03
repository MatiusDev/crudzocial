export const loadUsers = () => JSON.parse(localStorage.getItem('users'));
export const getUser = () => JSON.parse(sessionStorage.getItem('user'));
export const logout = () => sessionStorage.removeItem('user');

export function saveUser(users) {
  const strUsers = JSON.stringify(users);
  localStorage.setItem("users", strUsers);
}

export function saveUserSession(user) {
  const strUser = JSON.stringify(user);
  sessionStorage.setItem('user', strUser);
}