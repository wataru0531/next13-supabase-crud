/**************************************************************

リストのアイテム

***************************************************************/
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

import supabase from '../../utils/supabase' // クライアントサイドで使うsupabaseのインスタンス
import useStore from '../../store'
import { Database } from '../../../database.types'

type Todo = Database['public']['Tables']['todos']['Row']


const TodoItem = (todo: Todo) => {
  // console.log(todo); // 

  const router = useRouter()

  // 更新と削除
  const updateTask = useStore((state) => state.updateEditedTask)
  const resetTask = useStore((state) => state.resetEditedTask)

  // チェックボッスをクリック
  const updateMutate = async (id: string, completed: boolean) => {
    // 更新 eq ... イコールの意味
    await supabase.from("todos").update({ completed: completed }).eq("id", id)

    resetTask();

    router.refresh(); // 即時に反映
  }

  // ゴミ箱ボタンクリック
  const deleteMutate = async (id: string) => {
    await supabase.from('todos').delete().eq('id', id)

    router.refresh();
  }

  return (
    <li className="my-2">
      <input
        className="mr-1"
        type="checkbox"
        checked={todo.completed}
        // 現在のcompletedの値を反転させたものを渡す
        onChange={(e) => updateMutate(todo.id, !todo.completed)}
      />

      {/* ダイナミックセグメントの個別ページに遷移 */}
      <Link href={`/auth/todo-crud/${todo.id}`}>{ todo.title }</Link>

      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            updateTask({ id: todo.id, title: todo.title })
          }
          }
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteMutate(todo.id)
          }}
        />
      </div>
    </li>
  )
}

export default TodoItem;

