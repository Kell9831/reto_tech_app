import { Profile, User } from "../../types/index";
import { fetchWithAuth } from "../utils/fetchWithAuth";


export async function getUsers(): Promise<User[]> {
  return fetchWithAuth("/users");
}


export async function getUser(id: number): Promise<User> {
  return fetchWithAuth(`/users/${id}`);
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  return fetchWithAuth(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
}


export async function deleteUser(id: number): Promise<{ message: string }> {
  return fetchWithAuth(`/users/${id}`, {
    method: "DELETE",
  });
}


export async function createProfile(
  userId: number,
  profileData: Profile
): Promise<User> {
  return fetchWithAuth(`/users/${userId}/profile`, {
    method: "POST",
    body: JSON.stringify(profileData),
  });
}


export async function updateProfile(
  profileId: number,
  profileData: Partial<Profile>
): Promise<Profile> {
  return fetchWithAuth(`/users/profile/${profileId}`, {
    method: "PATCH",
    body: JSON.stringify(profileData),
  });
}
