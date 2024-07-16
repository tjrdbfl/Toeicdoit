import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CryptoJS from 'crypto-js';
import { IUser } from "./user-model";

// 암호화된 데이터 타입 정의
export interface EncryptedUserState {
    data: string | null; // 암호화된 데이터는 문자열 타입으로 저장
}

const initialState: EncryptedUserState = {
    data: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<IUser>) {
            console.log('setUserData');
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(action.payload), `${process.env.SECRET_KEY}`).toString();
            console.log('encryptedData: '+encryptedData);
            state.data = encryptedData; // 암호화된 데이터 저장
        },
        clearUserData(state) {
            console.log('clearUserData');
            state.data = null;
        },
    }
});
// 복호화 함수 별도 정의 (수정된 부분)
export const getDecryptedUserData = (state: EncryptedUserState): IUser | null => {
  if (state.data) {
    try {
      const bytes = CryptoJS.AES.decrypt(state.data, `${process.env.SECRET_KEY}`);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error("Error decrypting user data:", error);
      return null; // 복호화 실패 시 null 반환
    }
  }
  return null;
};
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
