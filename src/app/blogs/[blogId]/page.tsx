/**************************************************************

ブログの個別ページ ... ダイナミックセグメント

注　[] も１つのセグメントとなる

***************************************************************/
import Link from "next/link";
import { notFound } from "next/navigation"; // 個別ページが存在しないときに表示
import { format } from "date-fns";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

import type { Database } from "../../../../database.types";

type Blog = Database["public"]["Tables"]["blogs"]["Row"]

// 
type PageProps = {
  params: {
    blogId: string,
  }
}

// ブログのidに合うブログ詳細記事1つを取得する関数
// blogId ... urlが渡ってくる
const fetchBlog = async (blogId: string) => {
  const res = await fetch(
    // 引数で渡ってきたidと位置する記事を取得
    `${process.env.url}/rest/v1/blogs?id=eq.${blogId}&select=*`,
    {
      headers: new Headers({
        apikey: process.env.apikey as string,
      }),
      // 上の階層のlayoutのBlogListStaticのfetchBlog()の影響を受けてno-storeが設定されている。
      // 13.4以降は個別にcacheオプションを設定する必要がある
      cache: "force-cache",
    }
  )

  // オリジナルのnot-foundページを出すためにコメントアウト
  // if(!res.ok) throw new Error("Fail to fetch data in server");
  
  const blogs: Blog[] = await res.json();
  // console.log(blogs); // [{id: ..., created_at: ..., .....}]

  return blogs[0]; // 配列に1記事入っているので[0]とする
}


// 個別ページをStaticで生成するにはidを全て取得する必要がある。getStaticPathsのようなもの
export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  })

  const blogs: Blog[] = await res.json();

  // ここでidのみイドのみを取り出す
  // ビルド時に使う必要がある
  return blogs.map(blog => ({
    blogId: blog.id.toString(),
  }))
}


// サーバーコンポーネント 
// params...デフォルトでparamsが渡ってくる。「blogId]が格納されている
const BlogDetailPage = async ({ params }: PageProps) => {
  // console.log(params); // { blogId: 'b6b176c5-3eca-4bfa-9204-d2f897374bf9' }

  const blog = await fetchBlog(params.blogId);

  // ブログが存在しない場合は、対象のページも存在しないのでnotFoundをかます
  if(!blog) return notFound();

  return(
    <div className="mt-16 border-2 p-8">
      <p>
        <strong className="mr-3">Task ID:</strong>{ blog.id }
      </p>
      <p>
        <strong className="mr-3">Title:</strong>{ blog.title }
      </p>
      <p>
        <strong className="mr-3">Content:</strong>{ blog.content }
      </p>
      <p>
        <strong className="mr-3">Created at:</strong>
        { blog &&  format(new Date(blog.created_at), "yyyy-MM-dd HH:mm:ss") }
      </p>

      <Link href={`/blogs`}>
        <ArrowUturnLeftIcon className="mt-3 h-6 cursor-pointer text-blue-500" />
      </Link>
    </div>
  )
}

export default BlogDetailPage;

