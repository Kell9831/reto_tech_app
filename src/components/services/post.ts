import { Post } from "../../types/index";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export async function getPosts(): Promise<Post[]> {
  return fetchWithAuth("/posts");
}

export async function getPost(id: number): Promise<Post> {
  return fetchWithAuth(`/posts/${id}`);
}

export async function createPost(postData: Partial<Post>): Promise<Post> {
  return fetchWithAuth("/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export async function updatePost(
  id: number,
  postData: Partial<Post>
): Promise<Post> {
  return fetchWithAuth(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(postData),
  });
}

export async function deletePost(id: number): Promise<{ message: string }> {
  return fetchWithAuth(`/posts/${id}`, {
    method: "DELETE",
  });
}
