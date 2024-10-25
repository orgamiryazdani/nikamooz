import { Post } from "../../../types/post.interface";

export type CardProps = Omit<Post, 'userId'>