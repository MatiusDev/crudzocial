export const loadUsers = () => JSON.parse(localStorage.getItem('users'));

export function saveUser(users, user) {
  users[user.username] = user;
  const strUsers = JSON.stringify(users);
  localStorage.setItem("users", strUsers);
  return loadUsers();
}