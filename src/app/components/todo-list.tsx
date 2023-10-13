/**************************************************************

アイテムのリスト ... サーバーコンポーネント

サーバーサイドでデータフェッチ

・ダイナミックファンクション ... リクエスト毎にheadersやcookiesの値が変わる
Next.jsでheadersやcookiesを使っているページはダイナミックレンダリングがかかる

***************************************************************/
import { headers, cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '../../../database.types'
import TodoItem from './todo-item'


const TodoList = async () => {
  // サーバーサイドで使えるsupabaseのインスタンスを生成
  // サーバーコンポーネント側でクライアントからのHTTPにリクエストに含まれる
  // headerやcookieの値を読み込むためのheaders、cookiesを渡す
  const supabase = createServerComponentClient<Database>({
    headers,
    cookies,
  });

  const { data: todos } = await supabase
    .from('todos')
    .select()
    .order('created_at', { ascending: true }) // 作成日時順に

  return(
    <ul className="my-6 mx-3">
      { 
      todos?.map((todo) => (
          // console.log(todo)
          
          <TodoItem key={todo.id} {...todo } />
        ))
      }
    </ul>
  )
}

export default TodoList;



