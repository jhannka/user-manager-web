export interface IUser {
  id: number;
  email: string;
  name: string;
  phone_number: number;
  identification_card: string;
  birth_date: Date;
  departament: number;
  city_code: number;
  must_change_password: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface IResetPassword {
  id: number;
  password: string
}
