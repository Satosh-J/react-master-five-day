// UsersTable.tsx

import { FC } from "react";
import UserRow from "./UserRow";

interface UsersTableProps {
  users: User[]
}


const UsersTable: FC<UsersTableProps> = ({ users }) => {

  const handleDelete = (id: ID) => {
    console.log('Delete: ', id)
  }

  const handleEdit = (id: ID) => {
    console.log('Edit: ', id)
  }
  return (
    <div>
      <h1>Users</h1>
      <input type="text" className="search-input" placeholder="Search for names.." title="Type in a name" />

      <table>
        <thead className="header">
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
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user.id)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;