import { FC, useState } from "react";
import EditableTableCell from "./EditableCell";

interface UserRowProps {
  onSave: (newUser: NewUserData) => void;
  onCancel: () => void;
}

const editableFields = [
  'first_name',
  'last_name',
  'email',
  'phone',
]

const newUser = {
  first_name: '',
  last_name: '',
  email: '',
  ip_address: '',
  job: '',
  phone: ''
}

const NewUserRow: FC<UserRowProps> = ({ onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState(newUser);

  const handleSave = () => {
    // Save changes
    onSave(editedUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the edited user when input changes
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
    console.log({
      editedUser
    })
  };

  return (
    <tr
    >
      <td
      ></td>
      {
        editableFields.map((field) => (
          <EditableTableCell
            key={field}
            isEditing={true}
            name={field}
            onChange={handleInputChange}
            value={editedUser[field as keyof object]}
          />
        ))
      }
      <td
      >
        <button onClick={handleSave}
          className="btn btn-success"
        >
          Save
        </button>
      </td>
      <td
      >
        <button
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </td>
    </tr >
  );
};

export default NewUserRow;
