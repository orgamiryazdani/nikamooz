import classNames from "classnames";
import { BadgeProps } from "./badge.types";
import style from "../../style/components/badge.module.css";

export const Badge: React.FC<BadgeProps> = ({
  variant,
  className,
  children,
}: BadgeProps) => {
  const classes = classNames(
    style.badge,
    className,
    "flex-center",
    { [style[variant as keyof typeof style]]: variant },
  );

  return <span className={classes}>{children}</span>;
};
