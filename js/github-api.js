const REPO = "wcarpenter110981/docsnagger";
const FILE_PATH = "clients-accounts.json";
const GITHUB_API = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

let fileSha = null;

async function fetchAndCacheJSON() {
  const token = getToken();
  const res = await fetch(GITHUB_API, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3.raw"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch file from GitHub");
  const content = await res.text();
  window.clientData = JSON.parse(content);

  const shaRes = await fetch(GITHUB_API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const shaData = await shaRes.json();
  fileSha = shaData.sha;
}

async function pushUpdatedJSON(jsonData, commitMsg = "Update client config") {
  const token = getToken();
  const payload = {
    message: commitMsg,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(jsonData, null, 2)))),
    sha: fileSha
  };
  const res = await fetch(GITHUB_API, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error("GitHub update failed: " + err.message);
  }

  const updated = await res.json();
  fileSha = updated.content.sha;
  alert("✅ JSON successfully pushed to GitHub.");
}