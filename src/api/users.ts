export async function getUsers() {
  const response = await fetch(
    'http://localhost:5000/users'
  );
  const body = await response.json()
  return body;
}

// http://localhost:5000/users?_page=1&_limit=10
export async function fetchPaginatedUsers(pageNumber: number, itemsPerPage: number) {
  const apiUrl = `http://localhost:5000/users?_page=${pageNumber}&_limit=${itemsPerPage}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch paginated users. Status: ${response.status}`);
    }

    // Extract the total count from the 'X-Total-Count' header
    const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);

    // Parse the JSON response
    const users = await response.json();

    // Return an object containing both users and total count
    return { users, totalCount };
  } catch (error: any) {
    console.error('Error fetching paginated users:', error.message);
    throw error; // Re-throw the error for handling at the calling code
  }
}
