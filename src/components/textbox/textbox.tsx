import classNames from "classnames";
import { TextboxProps } from "./textbox.types";
import style from "../../style/components/textbox.module.css";

export const Textbox: React.FC<TextboxProps> = ({
  variant = "accent",
  type = "text",
  className,
  label,
  error,
  ...rest
}) => {
  const classes = classNames(style.textbox, className, {
    [style[variant as keyof typeof style]]: variant,
    [style.error]: error,
  });

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        className={classes}
        {...rest}
      />
      {error &&<div>{error}</div>}
    </div>
  );
};

export default Textbox;
