import { useState } from "react";
import Button from "../../button/button";
import Modal from "../../modal/modal";
import { EditProps } from "./edit.types";
import style from "./edit.module.css";
import Textbox from "../../textbox/textbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editPost } from "../../../features/posts/post-slice";
import { useUpdatePost } from "../../../hooks/usePosts";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string().min(5, "حداقل 5 حرف").required("لطفا مقداری وارد کنید"),
  body: Yup.string().min(10, "حداقل 10 حرف").required("لطفا مقداری وارد کنید"),
});

const EditPost: React.FC<EditProps> = ({ id, title, body }: EditProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { mutateAsync, isPending } = useUpdatePost();

  const formik = useFormik({
    initialValues: {
      title,
      body,
    },
    validationSchema,
    onSubmit: async (values) => {
      const { title: newTitle, body: newBody } = values;
      if (newTitle !== title || newBody !== body) {
        await mutateAsync({ id, title: newTitle, body: newBody });
        dispatch(editPost({ id, title: newTitle, body: newBody }));
        setModalOpen(false);
      } else {
        toast.error("مقادیر تغییری نکردند");
      }
    },
  });

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant='accent'>
        ویرایش
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title='ویرایش پست'>
        <form
          className={style.content}
          onSubmit={formik.handleSubmit}>
          <Textbox
            type='text'
            label='title'
            variant='secondary'
            {...formik.getFieldProps("title")}
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : undefined
            }
          />
          <Textbox
            type='text'
            label='body'
            variant='secondary'
            {...formik.getFieldProps("body")}
            error={
              formik.touched.body && formik.errors.body
                ? formik.errors.body
                : undefined
            }
          />
          <Button
            variant='accent'
            isLoading={isPending}
            loadingText='در حال اعمال تغییرات'
            type='submit'>
            تایید
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditPost;