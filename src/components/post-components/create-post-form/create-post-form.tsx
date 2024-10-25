import { useDispatch } from "react-redux";
import Button from "../../button/button";
import Textbox from "../../textbox/textbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPost } from "../../../features/posts/post-slice";
import Modal from "../../modal/modal";
import { useState } from "react";
import style from "./creat-post-form.module.css";
import { useCreatePost } from "../../../hooks/usePosts";
import { useSearchParams } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().min(5, "حداقل 5 حرف").required("لطفا مقداری وارد کنید"),
  body: Yup.string().min(10, "حداقل 10 حرف").required("لطفا مقداری وارد کنید"),
});

export const CreatePostForm: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useCreatePost();
  const [searchParams] = useSearchParams();
  const queryNumber = Number(searchParams.get("userId"));

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { title, body } = values;
      await mutateAsync({ title, body, userId: queryNumber || 1 });
      dispatch(
        createPost({ userId: queryNumber || 1, title: title, body: body }),
      );
    },
  });
  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant='accent'>
        اضافه کردن پست
      </Button>
      <Modal
        title='اضافه گردن پست'
        onClose={() => setModalOpen(false)}
        open={isModalOpen}>
        <form
          className={style.content}
          onSubmit={formik.handleSubmit}>
          <Textbox
            type='text'
            label='عنوان'
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
            label='توضیحات'
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