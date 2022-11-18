import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/UserTypedSelectorHook";
import { addUser, updateUser } from "../feature/UserSlice";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { BsFillCursorFill } from "react-icons/bs";

type UserFormData = {
  name: string;
  email: string;
};
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

interface NewUserProps {
  id: string;
}
const NewUser: React.FC<NewUserProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
  });
  console.log(id);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) =>
    state.user.data.find((user) => user.id === id)
  );

  setValue("name", userData?.name || "");
  setValue("email", userData?.email || "");

  const onSubmit = (data: UserFormData) => {
    const { name, email } = data;

    if (id) {
      editUser(name, email);
      return;
    }
    dispatch(addUser({ name, email, id: uuidv4() }));
    history.push("/");
  };

  const editUser = (name: string, email: string) => {
    dispatch(updateUser({ name, email, id }));
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white  p-4 px-4 text-sm ">
        <div className="md:col-span-5">
          <label htmlFor="full_name" className="text-left">
            Full Name
          </label>

          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="Full Name"
            {...register("name")}
          />
          <p className="mt-2 text-sm text-red-600">{errors.name?.message}</p>
        </div>

        <div className="mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="email@domain.com"
            {...register("email")}
          />
          <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
        </div>

        <div className="mt-3 text-right">
          <div className="inline-flex items-end">
            <button
              type="submit"
              className="flex items-center bg-indigo-600 text-white hover:bg-purple-500 p-2 rounded text-sm w-auto"
              // onClick={onSubmitHandle}
            >
              <BsFillCursorFill />
              <span>&nbsp;Submit</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewUser;