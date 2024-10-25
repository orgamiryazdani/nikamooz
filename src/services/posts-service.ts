import { EditProps } from "../components/post-components/edit/edit.types";
import { createData, deleteData, readData, updateData } from "../core/http-service";
import { Post } from "../types/post.interface";

// get posts api
export const getPosts = (id: number): Promise<Post[]> => {
  const url = `/posts?userId=${id || 1}`;
  return readData(url) as Promise<Post[]>;
}

// get one posts api
export const getOnePostApi = (id: number): Promise<Post> => {
  const url = `/posts/${id}`;
  return readData(url) as Promise<Post>;
}

// delete posts api
export const deletePostsApi = (id: number) => {
  const url = `/posts/${id}`;
  return deleteData(url);
}

// edit posts api
export const updatePostsApi = ({ id, title, body }: EditProps) => {
  const url = `/posts/${id}`;
  return updateData(url, { title, body });
}

// create posts api
export const createPostAPi = ({ userId, title, body }: Omit<Post, 'id'>) => {
  const url = `/posts`;
  return createData(url, { userId, title, body });
}