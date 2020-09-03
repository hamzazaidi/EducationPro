export interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  roles: Roles;
}

export interface Roles { 
    subscriber?: boolean;
    student?: boolean;
    admin?: boolean;
 }