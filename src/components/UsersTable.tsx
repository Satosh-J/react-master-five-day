// UsersTable.tsx

import { useState, useEffect, useRef } from "react";
import UserRow from "./UserRow";
import { useDispatch } from 'react-redux';
import { fetchFilteredPaginatedUsers } from "../api/users";
import Pagination from "./Pagination";


const UsersTable = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the desired number of items per page
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

  const prevFilterRef = useRef(filter); // useRef to store the previous filter value

  useEffect(() => {
    let cancel = false;
    setIsLoading(true);

    // Reset currentPage to 1 when the filter changes
    if (prevFilterRef.current !== filter) {
      setCurrentPage(1);
    }

    fetchFilteredPaginatedUsers(filter, currentPage, itemsPerPage).then((data) => {
      if (!cancel) {
        setUsers(data.users);
        setTotalCount(data.totalCount);
        setIsLoading(false);
      }
    });

    // Update the ref with the current filter value after the fetch
    prevFilterRef.current = filter;

    return () => {
      cancel = true;
    };
  }, [currentPage, filter]);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Users</h1>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <input type="text"
              value={filter}
              className="form-control my-2"
              placeholder="Search for names.."
              title="Type in a name"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-12">
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
                {isLoading && <tr><td colSpan={6} className="text-center">Loading...</td></tr>}
                {users.length > 0 ? users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onRowSelect={handleUserSelect}
                    onEdit={() => handleEdit(user.id)}
                    onDelete={() => handleDelete(user.id)}
                  />
                )) :
                  <tr><td colSpan={6}>No user found</td></tr>
                }
              </tbody>
            </table>
            <Pagination
              itemsCount={totalCount} //New state that stores total count
              // itemsCount={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default UsersTable;