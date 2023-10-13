/**************************************************************

認証関係はクライアントコンポーネントで設定
→クライアントコンポーネントで行う
→

***************************************************************/
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

// クライアントサイドでsupabaseのインスタンスを生成
import supabase from "../../utils/supabase"; 
import useStore from "../../store";


const Auth = () => {
  // console.log(supabase)

  const { loginUser } = useStore(); // Zustandで初期値を取得

  const [ isLogin, setIsLogin ] = useState(true); // 最初はログインモードに
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(isLogin){
      // ログインモード ... signInWithPassword
      // メールアドレス、パスワードを使って検証してログインする
      const { error } = supabase.auth.signInWithPassword({
          email,
          password,
      })
      // console.log(error)

      // ステートをリセット
      setEmail("");
      setPassword("");

      if(error){
        alert(error.message);
      } else {
        // 成功した場合の処理
        router.push("/auth/todo-crud");
      }

    } else {
      // 登録モード ... signUp
      // signUp()...supabaseのデータベースにメールアドレスとパスワードを保存
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      setEmail(""); // ステートのリセット
      setPassword("");

      if(error){
        alert(error.message);
      }
    }
  }

  // サインアウトの関数 ... signOut
  const signOut = () => {
    supabase.auth.signOut();
  }

  return(
    <div className="flex flex-col items-center justify-center">
      <div>
        <p className="mt-10">ログインしているユーザーがいたら表示</p>
        <p className="mt-2 text-green-500 text-center">「 { loginUser.email } 」</p>
      </div>

      <div className="mt-5 flex items-center">
        <span className="mr-5">sign out</span>

        <ArrowRightOnRectangleIcon 
          className="h-6 w-6 cursor-pointer text-blue-500"
          onClick={ signOut }
        />
      </div>
      

      <form onSubmit={ handleSubmit } className="mt-10">
        <div>
          <input 
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
            placeholder="Email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div>
          <input 
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
            placeholder="Password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <div className="my-6 flex justify-center text-sm">
          <button 
            type="submit"
            className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo"
          >
            { isLogin ? "Login" : "Register" }
          </button>
        </div>

        <p 
          className="text-center cursor-pointer font-medium hover:text-indigo-500"
          onClick={ () => setIsLogin(prevState => !prevState) }
        >
          change mode ?
        </p>
      </form>

    </div>
  )
}

export default Auth;