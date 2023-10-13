/**************************************************************

Zustandの設定 

***************************************************************/  
import create from "zustand";

// 管理したいステート
type EditedTask = {
  id: string,
  title: string | null
}

type LoginUser = {
  id: string | undefined,
  email: string | undefined,
}

// storeで使う型
type State = {
  editedTask: EditedTask,
  updateEditedTask: (payload: EditedTask) => void,
  resetEditedTask: () => void,

  loginUser: LoginUser,
  updateLoginUser: (payload: LoginUser) => void,
  resetLoginUser: () => void,
}


// ストア
const useStore = create<State>((set) => ({
  // 編集
  editedTask: { id: "", title: "" }, // 初期値

  updateEditedTask: (payload) => 
  set({ 
    editedTask: payload,
  }),
  // アロー関数の本文が1つの式で構成されている場合に使用できる短縮形
  resetEditedTask: () => set({ editedTask: { id: "", title: "" }}),

  
  // ログインしているユーザー
  loginUser: { id: "", email: "" }, // 初期値

  updateLoginUser: (payload) => 
    set({
      loginUser: payload,
    }),

  resetLoginUser: () => set({ loginUser: { id: "", email: "" } })

}))


export default useStore;