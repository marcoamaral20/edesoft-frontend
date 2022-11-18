import { useEffect, useState } from "react"

import { Link } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { useAppSelector } from "../hooks/UserTypedSelectorHook";
import { UserState } from "../feature/Types";

import UserList from "../components/userList";
import NewUser from "../components/NewUser";
import DialogBox from "../components/DialogBox"
import { BsPlusCircleFill } from "react-icons/bs";


export const HomePage: React.FC = (props) => {
    let [open, setOpen] = useState(false);
    const getUserList = useAppSelector((state) => state.user.data);

    const [searchTerm, setSearchTerm] = useState("");
    const [userListData, setUserListData] = useState<UserState[]>();

    useEffect(() => {
        setUserListData(getUserList);
        const filteredData = userListData?.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)
        );
        setUserListData(filteredData);
    }, [getUserList, searchTerm]);
    const DialogHandle = () => {
        setOpen((current) => !current);
    };

    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-green-200 via-indigo-200 to-pink-200">
          <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
            <Link to="/">
              <BsBuilding className="w-8 h-8 text-indigo-600 stroke-current" />{" "}
            </Link>
            <input
              className="flex items-center h-10 px-4 ml-10 text-sm w-1/3  bg-gray-200 rounded-full focus:outline-none focus:ring"
              type="search"
              placeholder="Search user …"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <button
              type="submit"
              className="flex items-center text-indigo-600 p-2 rounded text-sm w-auto"
              onClick={DialogHandle}
            >
              <BsPlusCircleFill />
              <span>&nbsp;Add</span>
            </button>
            <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
              INFO
            </button>
          </div>
          <UserList users={userListData} />
          {open && (
            <DialogBox open={open} OnDialogHandle={DialogHandle}>
              <NewUser id={""} />
            </DialogBox>
          )}
        </div>
      );
}