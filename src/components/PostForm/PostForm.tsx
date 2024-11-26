import React, { useEffect, useState } from "react";
import { Post } from "../../types/index";

interface PostFormProps {
  onCreate: (postData: Partial<Post>) => void;
  postToEdit: Post | null;
  onUpdate: (id: number, postData: Partial<Post>) => void;
}

const PostForm: React.FC<PostFormProps> = ({onCreate, postToEdit , onUpdate }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [postToEdit]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postToEdit) {
      // Si hay un post para editar, realiza la actualización
      onUpdate(postToEdit.id, { title, content });
    } else {
      // Si no hay un post para editar, crea uno nuevo
      onCreate({ title, content });
    }

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div>
        <label htmlFor="title" className="block text-xl font-semibold text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-xl font-semibold text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-200"
      >
        {postToEdit ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
