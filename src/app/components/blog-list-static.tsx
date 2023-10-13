/**************************************************************

blogsでデータフェッチを行うサーバーコンポーネント

***************************************************************/
import Link from "next/link";

import type { Database } from "../../../database.types";


type Blog = Database["public"]["Tables"]["blogs"]["Row"]


// 
const fetchBlogs = async () => {
  // ブログ全記事を取得
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    // Next13.4以降は個別に設定する必要がある
    // cache: "no-store", // SSR ダイナミックルーティング
    cache: "force-cache", 
  })

  if(!res.ok) throw new Error("Fail to fetch data in server");

  const blogs: Blog[] = await res.json();

  return blogs;
}


const BlogListStatic = async () => {
  // 全記事取得
  const blogs = await fetchBlogs();

  return(
    <div className="p-4">
      <p className="mb-4 pb-3 font-medium underline underline-offset-4">Blogs</p>
      <ul>
        { 
          blogs.map(blog => (
            <li key={ blog.id } className="my-1 text-base">
              {/* prefetch={ false } Next13.4以降は必要 */}
              <Link href={`/blogs/${blog.id}`} prefetch={ false }> 
                { blog.title }
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default BlogListStatic;