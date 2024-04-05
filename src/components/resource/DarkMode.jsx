import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modoDark } from "../../redux/darkMode";
import { TiStarburst } from "react-icons/ti";
import { FaMoon } from "react-icons/fa";
const DarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  // const [dark, setDark] = useState(DarkMode);
  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);
  const handleDark = () => {
    dispatch(modoDark(!darkMode));
  };
  return (
    <div className="fixed bottom-1 right-1">
      <button
        onClick={handleDark}
        className="dark:bg-black dark:text-white text-yellow-500 bg-black text-xl rounded-full p-2 "
      >
        {darkMode ? <FaMoon /> : <TiStarburst />}
      </button>
    </div>
  );
};

export default DarkMode;
