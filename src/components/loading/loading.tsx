import classNames from "classnames";
import { LoadingProps } from "./loading.types";
import style from "../../style/components/loading.module.css";

export const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  variant,
  className,
}: LoadingProps) => {
  const classes = classNames(
    style.loading,
    className,
    { [style[type]]: type },
    { [style[variant as keyof typeof style]]: variant },
  );

  return <span className={classes}></span>;
};
