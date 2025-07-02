const layoutPath = '../../components/layout';

import(`${layoutPath}/header/header.js`);
import(`${layoutPath}/footer/footer.js`);

document.addEventListener('DOMContentLoaded', () => {

  let user = JSON.parse(localStorage.getItem('sessionUser'));
  if (!user) {

    setTimeout(() => {
      window.location.href = '../login/login.html';
    }, 500);
    return;
  }

  const form = document.getElementById('profile-form');
  if (form) {
    form.name.value = user.name || '';
    form.lastname.value = user.lastname || '';
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
        name: form.name.value.trim(),
        lastname: form.lastname.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        country: form.country.value.trim(),
        city: form.city.value.trim(),
        address: form.address.value.trim(),
        postalcode: form.postalcode.value.trim()
      };

      let users = JSON.parse(localStorage.getItem('usuarios')) || [];
      users = users.map(u => u.email === user.email ? user : u);
      localStorage.setItem('usuarios', JSON.stringify(users));
      localStorage.setItem('sessionUser', JSON.stringify(user));
      alert('Perfil actualizado correctamente.');
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('sessionUser');
      window.location.href = '../login/login.html';
    });
  }

  const activityList = document.getElementById('activity-list');
  if (activityList) {

    const allNotes = JSON.parse(localStorage.getItem('crudzocialNotes') || '[]');
    const userNotes = allNotes.filter(n => n.email === user.email);
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