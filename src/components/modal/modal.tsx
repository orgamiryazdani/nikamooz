import useOutsideClick from "../../hooks/useOutsideClick";
import { ModalProps } from "./modal.types";
import style from "../../style/components/modal.module.css";

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}: ModalProps) => {
  const ref = useOutsideClick(onClose);

  return (
    open && (
      <div className={style.modalBackdrop}>
        <div
          ref={ref}
          className={style.modalContent}>
          <div className={style.modalHeader}>
            <p className={style.modalTitle}>{title}</p>
            <button
              className={style.modalClose}
              onClick={onClose}>
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
