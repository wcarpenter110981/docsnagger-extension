async function init() {
  const token = getToken();
  if (token) {
    try {
      await fetchAndCacheJSON();
      document.getElementById('authSection').classList.add('hidden');
      document.getElementById('menuSection').classList.remove('hidden');
    } catch (err) {
      alert('GitHub access error. Please check your token.');
      clearToken();
    }
  }
}

function storeToken() {
  const token = document.getElementById('tokenInput').value.trim();
  if (!token) {
    alert('Token required');
    return;
  }
  saveToken(token);
  location.reload();
}

function logout() {
  clearToken();
  location.reload();
}

function openPage(file) {
  chrome.tabs.create({ url: chrome.runtime.getURL(file) });
}

function openJSON() {
  if (!window.clientData) {
    alert("No data loaded yet.");
  } else {
    alert(JSON.stringify(window.clientData, null, 2));
  }
}

document.addEventListener("DOMContentLoaded", init);
document.getElementById("submitTokenBtn").addEventListener("click", storeToken);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("viewJSONBtn").addEventListener("click", openJSON);
document.getElementById("openClientBtn").addEventListener("click", () => openPage("client-manager.html"));
document.getElementById("openBankBtn").addEventListener("click", () => openPage("bank-editor.html"));
