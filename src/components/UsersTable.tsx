// UsersTable.tsx

import { useState, useEffect } from "react";
import UserRow from "./UserRow";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { fetchPaginatedUsers, getUsers } from "../api/users";
import Pagination from "./Pagination";


const UsersTable = () => {

  // const { users }: { users: User[] } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the desired number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const [totalCount, setTotalCount] = useState(0)



  const dispatch = useDispatch()

  const handleUserSelect = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user })
  }

  const [filter, setFilter] = useState('');

  const handleDelete = (id: ID) => {
    console.log('Delete: ', id)
  }

  const handleEdit = (id: ID) => {
    console.log('Edit: ', id)
  }

  useEffect(() => {
    // Simulating asynchronous data fetching
    const fetchData = async () => {
      try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Filtering logic (simulated API response)
        const filteredData = users.filter((user) => {
          return Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(filter.toLowerCase())
          );
        });

        // Update state with filtered data
        setFilteredUsers(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData when the filter or users change
    fetchData();
  }, [filter, users]);

  useEffect(() => {
    let cancel = false;

    getUsers().then((data) => {
      if (!cancel) {
        setUsers(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let cancel = false;

    fetchPaginatedUsers(currentPage, itemsPerPage).then((data) => {
      if (!cancel) {
        setUsers(data.users);
        setTotalCount(data.totalCount)
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Users</h1>
      <input type="text"
        value={filter}
        className="form-control my-2"
        placeholder="Search for names.."
        title="Type in a name"
        onChange={(e) => setFilter(e.target.value)}
      />
      {
        isLoading ? <p>Loading...</p> :
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow
                  onRowSelect={handleUserSelect}
                  key={user.id}
                  user={user}
                  onEdit={() => handleEdit(user.id)}
                  onDelete={() => handleDelete(user.id)}
                />
              ))}
            </tbody>
          </table>
      }
      <Pagination
        itemsCount={totalCount} //New state that stores total count
        // itemsCount={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </div>
  );
}

export default UsersTable;