import classNames from "classnames";
import { Loading } from "../loading/loading";
import { ButtonProps } from "./button.types";
import style from "../../style/components/button.module.css";

const Button: React.FC<ButtonProps> = ({
  variant,
  isLoading = false,
  loadingType = "spinner",
  loadingText = "در حال ارسال درخواست",
  type = "button",
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = classNames(
    style.btn,
    "flex-center",
    className,
    { [`${style.loading}`]: isLoading },
    { [style[variant as keyof typeof style]]: variant }
  );

  return (
    <button
      type={type}
      {...rest}
      className={classes}>
      {isLoading && <Loading type={loadingType} />}
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;
