/**************************************************************

todoリストの詳細ページ

***************************************************************/
import { notFound } from "next/navigation";
import { headers, cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";

import type { Database } from "../../../../../database.types";

// todoIdだとエラーが出るので、Idとする
type PageProps = {
  params: {
    Id: string
  }
}


const TodoDetailPage = async ({ params }: PageProps) => {
  // console.log(params)

  // サーバー側でデータフェッチ
  // サーバー側でsupabaseを使ってデータフェッチするためにインスタンスの生成
  const supabase = createServerComponentClient<Database>({
    headers,
    cookies,
  })

  // todo.idに一致する、データを１つ取得
  const { data: todo, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", params.Id)
    .single()

  // console.log(todo)

  // 見つからなかったらnotFound
  if(!todo) return notFound();

  return(
    <div className="mt-16 border-2 p-8">
      <p>Task ID: { todo.id }</p>
      <p>Title : { todo.title }</p>
      <p>Status: { todo.completed ? "done" : "not yet" }</p>
      <p>
        Created at: {" "}
        { todo && format(new Date(todo.created_at), "yyyy-MM-dd HH:mm:ss") }
      </p>
    </div>
  )
}

export default TodoDetailPage;

