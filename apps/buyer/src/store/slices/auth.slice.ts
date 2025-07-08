import { ACCESS_TOKEN, CURRENT_USER } from "@/lib/constants";
import clientCookies from "@/lib/storage/cookie.client";
import clientLocal from "@/lib/storage/local.client";
import { TAuthResponse, TUser } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* NOTE: Redux Toolkit
 * - Step: create Slide => create Reducer => add to Store.
 * - Actions: don't need to create, they auto created by Slide.
 * - Action name format: slideName/reducerName. Ex: auth/set.
 * - Mutable style: is allowed to write, Redux Toolkit attached Immer will convert them to Immutable style
 * - Immer sẽ clone state đã áp dụng các thay đổi, rồi return bản clone ngầm cho bạn.
 * - return: bỏ qua Immer, bạn tự tạo và trả về state mới.
 */
type TAuthState = {
  accessToken: string | null;
  currentUser: TUser | null;
}

const initialState: TAuthState = {
  accessToken: clientCookies.get(ACCESS_TOKEN) || null,
  currentUser: clientLocal.get(CURRENT_USER) || null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<TAuthResponse>) => {
      clientCookies.set(ACCESS_TOKEN, payload.accessToken);
      clientLocal.set(CURRENT_USER, payload.currentUser);

      state.accessToken = payload.accessToken;
      state.currentUser = payload.currentUser;
    },
    setCurrentUser: (state, { payload }: PayloadAction<TUser>) => {
      clientLocal.set(CURRENT_USER, payload);

      state.currentUser = payload;
    },
    clean: () => {
      clientCookies.remove(ACCESS_TOKEN);
      clientLocal.remove(CURRENT_USER);

      return { accessToken: null, currentUser: null };
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;