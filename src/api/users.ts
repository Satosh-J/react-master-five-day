import { GET_USERS } from "../store/actions";


const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const MODE = import.meta.env.MODE;
console.log({
  MODE
})


export async function getUsers() {
  const response = await fetch(
    'http://localhost:5000/users'
  );
  const body = await response.json()
  return body;
}

export function fetchFilteredPaginatedUsers(query: string, pageNumber: number, itemsPerPage: number) {
  const apiUrl = `${BASE_API_URL}/users?q=${query}&_page=${pageNumber}&_limit=${itemsPerPage}`;

  const payload = {
    action: GET_USERS,
    method: 'GET',
    url: apiUrl,
  };
  return { type: 'API_INVOCATION', payload };
}

export async function saveUser(
  newUserData: NewUserData
) {
  const response = await fetch(
    'http://localhost:5000/users',
    {
      method: 'POST',
      body: JSON.stringify(newUserData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const body = (await response.json()) as SavedUserData;
  return { ...newUserData, ...body };
}


export async function updateUser(user: User) {
  const response = await fetch(`http://localhost:5000/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  const updatedUser: User = await response.json();
  return updatedUser;
}

export async function deleteUser(id: ID) {
  const response = await fetch(`http://localhost:5000/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.statusText}`);
  }

  return true;
}