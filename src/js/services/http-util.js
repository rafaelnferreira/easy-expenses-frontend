function makeHeaders() {
  return new Headers({
    'gapiauth': `Bearer ${window.gapi.auth.getToken().access_token}`,
    'Content-Type': 'application/json',
  });
}

function handleError(response) {
  if (response.ok) return response
  else throw Error(response.statusText)
}

export const get = (url) => {
  const req = new Request(url, {
    headers: makeHeaders(),
  });

  return fetch(req)
    .then(response => handleError(response));
}

export const post = (url, payload) => {
  const req = new Request(url, {
    headers: makeHeaders(),
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return fetch(req)
    .then(response => handleError(response));
}