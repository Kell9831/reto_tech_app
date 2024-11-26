import { useEffect, useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../services/post";
import { Post } from "../../types/index";
import PostList from "../PostList/PostList";
import PostForm from "../PostForm/PostForm";

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Error al cargar los posts");
        } else {
          setError("Error desconocido al cargar los posts");
        }
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (newPost: Partial<Post>) => {
    try {
      const createdPost = await createPost(newPost);
      setPosts((prevPosts) => [...prevPosts, createdPost]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al crear el post");
      } else {
        setError("Error desconocido al crear el post");
      }
    }
  };

  const handleUpdatePost = async (id: number, postData: Partial<Post>) => {
    try {
      const updatedPost = await updatePost(id, postData);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      // reseteo del estado de postToEdit
      setPostToEdit(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar el post");
      } else {
        setError("Error desconocido al actualizar el post");
      }
    }
  };

  const handleEditPost = (post: Post) => {
    setPostToEdit(post); // post o editar
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al eliminar el post");
      } else {
        setError("Error desconocido al eliminar el post");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-500 mb-6">
          Posts
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-6">
          <PostForm
            onCreate={handleCreatePost}
            postToEdit={postToEdit}
            onUpdate={handleUpdatePost}
          />
          <PostList
            posts={posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        </div>
      </div>
    </div>
  );
};

export default App;