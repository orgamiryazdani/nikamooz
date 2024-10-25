import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post.interface';

interface PostsState {
    posts: Post[];
}

const initialState: PostsState = {
    posts: [],
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost(state, action: PayloadAction<Omit<Post, 'id'>>) {
            const newPost = { id: Date.now(), userId: action.payload.userId, title: action.payload.title, body: action.payload.body }
            state.posts.push(newPost)
        },
        setPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
        },
        deletePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        editPost(state, action: PayloadAction<Omit<Post, "userId">>) {
            state.posts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return { ...post, title: action.payload.title, body: action.payload.body };
                }
                return post;
            });
        }
    },
});

export const { setPosts, deletePost, editPost, createPost } = postsSlice.actions;
export default postsSlice.reducer;
