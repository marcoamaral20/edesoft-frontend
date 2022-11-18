import { useState } from "react";
import UserInfo from "../components/userInfo";
import NewUser from "./NewUser";
import DialogBox from "./DialogBox";
import { UserState } from "../feature/Types";

interface UserProps {
  users: UserState[] | undefined;
}
const UserList: React.FC<UserProps> = ({ users }) => {
  let [open, setOpen] = useState(false);
  let [id, setID] = useState("");

  const UserUpdate = (id: string) => {
    setID(id);
    setOpen(true);
  };

  const DialogHandle = () => {
    setOpen((current) => !current);
  };
  return (
    <div className="flex flex-col mx-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {users &&
          users.map((user) => (
            <UserInfo
              key={user.id}
              user={user}
              onUserUpdate={UserUpdate}
            />
          ))}

        {open && (
          <DialogBox open={open} OnDialogHandle={DialogHandle}>
            <NewUser id={id} />
          </DialogBox>
        )}
      </div>
    </div>
  );
};

export default UserList;