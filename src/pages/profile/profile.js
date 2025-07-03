const layoutPath = '../../components/layout';

import { showMessage } from "../../utils/global/global.js";
import { LogHandler } from "../../utils/logs.js";
import { getUser, loadUsers, saveUser, saveUserSession } from "../../utils/users.js";

document.addEventListener('DOMContentLoaded', () => {
  import(`${layoutPath}/header/header.js`);
  import(`${layoutPath}/footer/footer.js`);

  let user = getUser();
  if (!user) {
    window.location.href = '../../../index.html';
    return;
  }

  const { addLog, getLogs, error } = LogHandler();

  if (error) {
      showMessage(error, "error");
      return;
  }
  
  addLog(user.username, `Usuario ${user.username} ha ingresado a las configuraciones de su perfil`, "info");

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
        fullname: form.name.value.trim() + ' ' + form.lastname.value.trim(),
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
      addLog(user.username, `El usuario ${user.username} ha actualizado su perfil`, "success");
      showMessage('Perfil actualizado correctamente.', 'success');
    });
  }

  const activityList = document.getElementById('activity-list');
  if (activityList) {
    const logs = getLogs(user.username);
    if (logs.length === 0) {
      activityList.innerHTML = '<li>No hay actividad reciente.</li>';
    } else {
      logs.forEach(log => {
        const li = document.createElement('li');
        li.textContent = `Tipo: ${log.type} - Acción: ${log.message} - Fecha: ${new Date(log.timestamp).toLocaleString()}`;
        activityList.appendChild(li);
      });
    }
  }
});