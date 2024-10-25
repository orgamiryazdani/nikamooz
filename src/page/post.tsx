import { useParams } from "react-router-dom";
import { Loading } from "../components/loading/loading";
import { useGetOnePost } from "../hooks/usePosts";
import AppLayout from "../layouts/app-layout";
import style from "../style/post.module.css";
import Button from "../components/button/button";

const Post: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetOnePost(Number(id));

  return (
    <AppLayout>
      <div className={`flex-center ${style.postContent}`}>
        {isLoading && (
          <Loading
            type='ring'
            variant='success'
          />
        )}
        {error && (
          <div>
            <div>خطا در برقراری ارتباط با سرور</div>
            <Button
              variant='error'
              onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          </div>
        )}
        {!isLoading && !error && !data && <div>محصولی وجود ندارد</div>}
        <h1>{data?.title}</h1>
        <h3>{data?.body}</h3>
      </div>
    </AppLayout>
  );
};

export default Post;