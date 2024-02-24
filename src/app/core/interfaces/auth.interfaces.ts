export interface IToken {
  token: string;
  userId: number;
}

export interface IUser {
  email: string;
  password: string;
  client_id: string;
  client_secret: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IInfoUser {
  id: number;
  name: string;
  email: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  actions: Action[];
}

export interface Action {
  id: number;
  name: Name;
  state: boolean;
}

export enum Name {
  Create = "create",
  Delete = "delete",
  Show = "show",
  Update = "update",
}
