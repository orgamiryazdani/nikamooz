import { useGetPosts } from "../hooks/usePosts";
import AppLayout from "../layouts/app-layout";
import { Post } from "../types/post.interface";
import style from "../style/posts-page.module.css";
import Card from "../components/post-components/card/card";
import { Loading } from "../components/loading/loading";
import Button from "../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { setPosts } from "../features/posts/post-slice";
import Pagination from "../components/pagination/pagination";
import { useSearchParams } from "react-router-dom";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [searchParams] = useSearchParams();

  const { data, isLoading, error, refetch } = useGetPosts(
    Number(searchParams.get("userId")),
  );

  useEffect(() => {
    dispatch(setPosts(data ? data : []));
  }, [data]);

  return (
    <AppLayout>
      <div className={`flex-center ${style.posts}`}>
        {isLoading && (
          <Loading
            type='spinner'
            variant='accent'
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
        {!isLoading && !error && (!posts || posts.length === 0) && (
          <div>محصولی وجود ندارد</div>
        )}
        {posts && !isLoading && !error && (
          <div className={`flex-center ${style.postPage}`}>
            {posts.map((post: Post) => (
              <Card
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination />
    </AppLayout>
  );
};

export default Products;
