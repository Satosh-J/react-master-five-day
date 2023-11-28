export async function getUsers() {
  const response = await fetch(
    'http://localhost:5000/users'
  );
  const body = await response.json()
  return body;
}