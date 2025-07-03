const layoutPath = '../../components/layout';

import { getUser, loadUsers, saveUser, saveUserSession } from "../../utils/users.js";

document.addEventListener('DOMContentLoaded', () => {
  import(`${layoutPath}/header/header.js`);
  import(`${layoutPath}/footer/footer.js`);

  let user = getUser();
  if (!user) {
    window.location.href = '../../../index.html';
    return;
  }

  const form = document.getElementById('profile-form');
  if (form) {
    const nameParts = user.fullname.split(' ');
    const name = nameParts[0];
    const lastname = nameParts.slice(1).join(' ');

    form.name.value = name || '';
    form.lastname.value = lastname || '';
    form.email.value = user.email || '';
    form.phone.value = user.phone || '';
    form.country.value = user.country || '';
    form.city.value = user.city || '';
    form.address.value = user.address || '';
    form.postalcode.value = user.postalcode || '';

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      user = {
        ...user,
        fullname: form.name.value.trim(),
        lastname: form.lastname.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        country: form.country.value.trim(),
        city: form.city.value.trim(),
        address: form.address.value.trim(),
        postalcode: form.postalcode.value.trim()
      };

      let users = loadUsers() || {};
      users[user.username] = user;
      saveUser(users);
      saveUserSession(user);
      alert('Perfil actualizado correctamente.');
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('user');
      window.location.href = '../login/login.html';
    });
  }

  const activityList = document.getElementById('activity-list');
  if (activityList) {
    const notesObj = JSON.parse(localStorage.getItem('notes') || '{}');
    const userNotes = notesObj[user.username] || [];
    if (userNotes.length === 0) {
      activityList.innerHTML = '<li>No hay actividad reciente.</li>';
    } else {
      userNotes.slice(-5).reverse().forEach(note => {
        const li = document.createElement('li');
        li.textContent = `Nota: ${note.title || 'Sin título'} - ${note.content.substring(0, 40)}...`;
        activityList.appendChild(li);
      });
    }
  }
});