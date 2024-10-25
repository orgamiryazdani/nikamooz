import { NavLink } from "react-router-dom";
import style from "../style/header.module.css";
import { CreatePostForm } from "../components/post-components/create-post-form";

const Header = () => {
  return (
    <div className={`flex-center ${style.header}`}>
      <NavLink
        to='/'
        className={({ isActive }) => (isActive ? style.activeLink : "")}>
        پست ها
      </NavLink>
      <CreatePostForm />
    </div>
  );
};

export default Header;
