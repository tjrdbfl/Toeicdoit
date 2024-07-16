import { IUser } from "./user-model";

interface UserState {
    data: IUser | null; 
}
  
export const initialState: UserState = {
    data: null,
};