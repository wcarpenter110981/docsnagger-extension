function saveToken(token) {
  localStorage.setItem('docsnaggerToken', token);
}

function getToken() {
  return localStorage.getItem('docsnaggerToken');
}

function clearToken() {
  localStorage.removeItem('docsnaggerToken');
}