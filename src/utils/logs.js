export const LogHandler = () => {
  const logs = JSON.parse(localStorage.getItem("logs")) || {};

  const addLog = (username, message, type = "info" ) => {
    if ( !logs[username] ) {
      logs[username] = [];
    }

    logs[username].push({
      message,
      type,
      timestamp: new Date().toISOString()
    });
      
    localStorage.setItem("logs", JSON.stringify(logs));
  };

  const getAllLogs = () => {
    const mappedLogs = Object.entries(logs).map(([username, userLogs]) => {
      return userLogs.map(log => ({ ...log, author: username }));
    });
    const allLogs = [].concat(...mappedLogs);

    return allLogs;
  }

  const getLogs = username => logs[username] || [];

  return {
    addLog,
    getAllLogs,
    getLogs,
    error: null
  };
}