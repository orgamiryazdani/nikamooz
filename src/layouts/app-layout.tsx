import { ReactNode } from "react";
import Header from "./header";
import style from "../style/layout.module.css";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.layout}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={`flex-center ${style.content}`}>{children}</div>
    </div>
  );
};

export default AppLayout;
