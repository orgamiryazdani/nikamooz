import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostAPi, deletePostsApi, getOnePostApi, getPosts, updatePostsApi } from "../services/posts-service";
import { Post } from "../types/post.interface";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/posts/post-slice";
import toast from "react-hot-toast";

export const useGetPosts = (id: number) => {
    const { data, error, refetch, isLoading } = useQuery<Post[]>({
        queryKey: ['posts', id],
        queryFn: () => getPosts(id),
        staleTime: 5 * 60 * 60 * 1000,
        gcTime: 6 * 60 * 60 * 1000
    })

    return { data, error, refetch, isLoading };
}

export const useGetOnePost = (id: number) => {
    const { data, error, isLoading, refetch } = useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => getOnePostApi(id),
        staleTime: 5 * 60 * 60 * 1000,
        gcTime: 6 * 60 * 60 * 1000
    })

    return { data, error, isLoading ,refetch};
}


export const useDeletePost = (id: number) => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: deletePostsApi,
        onSuccess: () => {
            dispatch(deletePost(id));
            toast.success('پست با موفقیت حذف شد')
        }
    })
}

export const useUpdatePost = () => {
    return useMutation({
        mutationFn: updatePostsApi,
        onSuccess: () => {
            toast.success('پست با موفقیت آپدیت شد')
        }
    })
}

export const useCreatePost = () => {
    return useMutation({
        mutationFn: createPostAPi,
        onSuccess: () => {
            toast.success('پست باموفقیت ایجاد شد')
        }
    })
}