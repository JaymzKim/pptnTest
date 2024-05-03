import { create } from "zustand";

interface userInfoType {
    profileUrl: string
    name: string
    swId: string
    sawonCode: number
    sosok: string    
}
interface userInfoState {
    userInfo: userInfoType
}
interface userInfoActions {
    setUserInfo: (userInfo: userInfoType) => void
    clearUserInfo: () => void
}
const defaultState = { profileUrl: "", name: "", swId: "", sawonCode: 0, sosok: "" }
const useAuthStore = create<userInfoState & userInfoActions>((set) => ({
    userInfo: defaultState,
    setUserInfo: (userInfo) => set((state) => ({ ...state, userInfo })),
    clearUserInfo: () => {set({userInfo: defaultState})}
}));
  
export default useAuthStore