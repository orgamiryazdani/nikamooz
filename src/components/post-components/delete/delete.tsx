import { useState } from "react";
import truncateText from "../../../utils/truncateText";
import Button from "../../button/button";
import Modal from "../../modal/modal";
import { DeleteProps } from "./delete.types";
import style from "./delete.module.css";
import { useDeletePost } from "../../../hooks/usePosts";

const DeletePost: React.FC<DeleteProps> = ({ id, title }: DeleteProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { mutateAsync, isPending } = useDeletePost(id);

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant='error'>
        حذف
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={`${truncateText(title, 20)}`}>
        <div className={`flex-center ${style.content}`}>
          <div>
            <Button
              onClick={() => mutateAsync(id)}
              isLoading={isPending}
              loadingText='در حال حذف پست'
              variant='error'>
              بله
            </Button>
            <Button
              onClick={() => setModalOpen(false)}
              variant='secondary'>
              خیر
            </Button>
          </div>
          <span>آیا از حذف این پست مطمعن هستید؟</span>
        </div>
      </Modal>
    </>
  );
};

export default DeletePost;
