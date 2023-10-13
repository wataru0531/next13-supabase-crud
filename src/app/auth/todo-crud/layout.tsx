/**************************************************************

・fallbackフォールバック）
コンピュータサイエンスとソフトウェア開発の文脈で使用される一般的な用語で、
特定の状況や条件が発生した際に代替手段や選択肢を提供することを指す

***************************************************************/

import { Suspense } from "react";

import Spinner from "@/app/components/spinner";
import EditTask from "@/app/components/todo-edit";
import TodoList from "@/app/components/todo-list";


const TodoLayout = ({ children }: { children: React.ReactNode }) => {

  return(
    <section className="flex">
      <aside className={`h-[calc(100vh - 56px)] w-1/4 bg-gray^200`}>
        
        <EditTask />

        {/* サーバーコンポーネントはラップして他のコンポーネントをストリーミングできるようにする */}
        <Suspense fallback={ <Spinner /> }>
          {/* @ts-ignore */}
          <TodoList />
        </Suspense>

      </aside>
      
      <main className="flex flex-1 justify-center">
        { children }
      </main>
    </section>
  )
}

export default TodoLayout;