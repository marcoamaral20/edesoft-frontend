import * as React from "react";
import {
  BsFillPenFill,
  BsFillTrashFill,
  BsFillCalendar3WeekFill,
  BsReplyAllFill,
  BsShareFill,
  BsMailbox2,
  BsTelephoneFill,
  BsFilePerson,
} from "react-icons/bs";
import {UserState} from "../feature/Types";
import { useAppDispatch } from "../hooks/UserTypedSelectorHook";
import { deleteUser } from "../feature/UserSlice"

interface UserProps {
  user: UserState;
  onUserUpdate: (id: string) => void;
}

const UserInfo: React.FC<UserProps> = (props) => {
  const dispatch = useAppDispatch();
  const user = props.user;

  const setUpdatePage = (id: string) => {
    props.onUserUpdate(id);
  };

  return (
    <div className="bg-white-500">
      <div className="flex flex-col pb-2 overflow-auto">
        <div
          className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
          draggable="true"
        >
          <button
            className="absolute top-0 right-0  items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
            onClick={() => setUpdatePage(user.id)}
          >
            <BsFillPenFill />
          </button>
          <button
            className="absolute top-7 right-0  items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
            onClick={() => dispatch(deleteUser({
                id: user.id,
                name: "",
                email: ""
            }))}
          >
            <BsFillTrashFill />
          </button>

          <div className="rounded-md pl-6 text-sm font-medium text-gray-800">
            <div className="flex items-center w-full mt-3 ">
              <div className="flex items-center">
                <BsFilePerson />
                <span className="ml-1 leading-none">{user.name}</span>
              </div>
            </div>

            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
              <div className="flex items-center">
                <BsMailbox2 />
                <span className="ml-1 leading-none">{user.email}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <BsFillCalendar3WeekFill />
              <span className="ml-1 leading-none">Dec 12</span>
            </div>
            <div className="relative flex items-center ml-4">
              <BsReplyAllFill />
              <span className="ml-1 leading-none">4</span>
            </div>
            <div className="flex items-center ml-4">
              <BsShareFill />
              <span className="ml-1 leading-none">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;