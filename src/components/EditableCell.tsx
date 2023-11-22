import { FC } from "react";

interface UserRowProps {
  name: string
  value: string
  onChange: (e: any) => void
  isEditing: boolean
}

const EditableTableCell: FC<UserRowProps> = ({ name, value, onChange, isEditing = false }) => {


  return (
    <td className={isEditing ? 'editing' : ''}
      style={{
        border: '1px solid #cccccc',
        textAlign: 'left',
        padding: '10px'
      }}
    >
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        value
      )}
    </td>

  );
};

export default EditableTableCell;
