/**************************************************************

streaming-sr のセグメント

２つのサーバーコンポーネントをラップしている状態

***************************************************************/
// このページでは、セグメントレベルでキャッシュのオプションを設定する。
// ダイナミックレンダリングを有効化
export const revalidate = 0;

import { Suspense } from "react";
import BlogList  from "../components/blog-list";
import NewsList from "../components/news-list";
import Spinner from "../components/spinner";


const StreamingServerRenderingPage = () => {

  return(
    <section className="flex">

      <aside className="w-1/4">
        <section className="fixed m-1 h-full w-1/4 border border-blue-500 bg-gray-200 p-1">
          <Suspense fallback={ <Spinner color="border-green-500" /> }>
            
            <BlogList />
          </Suspense>
        </section>
      </aside>

      <main>
        <section className="fixed w-3/4">
          <Suspense fallback={ <Spinner color="border-blue-500" /> }>
            
            <NewsList />
          </Suspense>
        </section>
      </main>

    </section>
  )
}

export default StreamingServerRenderingPage;