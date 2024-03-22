export interface User {
  readonly id?: string;
  uid?: string;
  readonly role: Rols;
  name: string;
  email: string;
  description?: string;
  active: boolean;
  image?: string;
  password?: string;
  rfc?: string;
}
export interface UserAdmin extends User {
  phone?: number;
}