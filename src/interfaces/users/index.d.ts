export interface User {
  id: string;
  uid?: string;
  role: Roles;
  name: string;
  email: string;
  description?: string;
  active: boolean;
  image?: string;
  password?: string;
  rfc?: string;
  phone?: number;
}

export interface UserAdmin extends User {
}

export interface SuperAdmin extends User {
}

export interface BranchOffice extends User {
  userAdmin?: string | UserAdmin;
  salesGoalByMonth: number;
  facebook: string;
  phones: number[];
  latLng: LatLng;
  center: LatLng;
  radius: number;
  address: string;
  comments: CommentsBranchOffice[];
  totalSales?: number;
  showInApp: boolean;
  validatedImages: boolean;
  validatingImages: boolean;
  products: string[] | Product[];
  images: string[];
}

export interface UserSeller extends User {
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  validatedImages: boolean;
  validatingImages: boolean;
}

export interface UserDeliveryMan extends User {
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  latLng?: LatLng;
}
