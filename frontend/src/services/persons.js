const baseUrl = '/api/persons';

const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
}

const create = async (body) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
}

const update = async (body, id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
}

const del = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });
  return response;
}

export default {
  getAll,
  create,
  update,
  del
};