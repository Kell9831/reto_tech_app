import React from "react";
import { Post } from "../../types/index";

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
  
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete, onEdit }) => {
  if (posts.length === 0) {
    return <p>No hay posts disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {posts.map((post) => (
      <div key={post.id} className="post-item bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-stone-900">{post.title}</h3>
        <p className="mt-2 text-gray-700">{post.content}</p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onEdit(post)}
            className="text-sky-700 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="text-rose-700 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
  );
};

export default PostList;
