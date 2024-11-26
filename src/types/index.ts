export interface Profile {
    firstname: string;
    lastname: string;
    age?: number;
  }
  

  export interface User {
    username: string;
    password: string;
    profileId: number; 
  }

  export interface Post {
    id: number;
    title: string;
    content: string;
    author: {
      id: number;
      username: string;
      createdAt: string;
      authStrategy: string | null;
    };
  }
  
  
export interface AuthResponse {
  access_token: string; 
}
  
export interface UserCredentials {
  username: string;
   password: string;
}
  
