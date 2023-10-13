/**************************************************************



***************************************************************/
"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

import useStore from "../../store";
import supabase from "../../utils/supabase"; // クライアントサイドで使えるsupabaseのインスタンス


const EditTask = () => {
  const router = useRouter();
  
  const { editedTask } = useStore();
  const { loginUser } = useStore();
  const updateTask = useStore(state => state.updateEditedTask);
  const reset = useStore(state => state.resetEditedTask);

  // サインアウト
  const signOut = () => {
    // supabaseのサインアウト
    supabase.auth.signOut();

    router.push("/auth");
  }

  // タスクの新規作成時、編集時に実行される関数
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // idが空の場合は、新規作成
    if(editedTask.id === ""){
      const { error } = await supabase
      .from("todos")
      .insert({ title: editedTask.title, user_id: loginUser.id })

      router.refresh();
      reset();
    } else {
      // タスクを編集する処理
      // 新しいタイトル、更新対象のタスクのidを渡す
      const { error } = await supabase
      .from("todos")
      .update({ title: editedTask.title })
      .eq("id", editedTask.id)

      router.refresh();
      reset();
    }
  }

  return(
    <div className="m-5 text-center">
      <p className="my-3">{ loginUser.email }</p>

      <div className="flex justify-center">
        <ArrowRightOnRectangleIcon
          className="my-3 h-6 w-6 cursor-pointer text-blue-500"
          onClick={ () => signOut() }
        />
      </div>

      <form onSubmit={ submitHandler }>
        <input 
          type="text"
          className="my-2 rounded border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
          placeholder="New task ?"
          value={ editedTask.title || "" }
          onChange={ (e) => updateTask({ ...editedTask, title: e.target.value }) }
        />

        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          { editedTask.id === "" ? "Create" : "Update" }
        </button>

      </form>

    </div>
  )
}

export default EditTask;