import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserById,
  getUserId,
} from "../../redux/actions/registro/registerUser.js";

const Loading = () => {
  const init = useSelector((state) => state.init);
  const error = useSelector((state) => state.error);
  const users = useSelector((state) => state.user);
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");

  useEffect(() => {
    if (user || id) {
      setId(user.id);
    }
    const checkUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await dispatch(checkUserById(id));
        await dispatch(getUserId(id));
        if (init !== "") {
          if (init === true) {
            if (users.admin === true) {
              return navigate("/home");
            } else {
              return navigate(`/user/${user.id}`);
            }
          } else {
            return navigate("/registro");
          }
        }
      } catch (error) {}
    };
    checkUser();
  }, [init, user, users]);

  return (
    <div>
      <div className=" bg-indigo-200 min-h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loading;
