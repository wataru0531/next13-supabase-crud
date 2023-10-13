/**************************************************************

ブログの一覧を取得して表示するサーバーコンポーネント

***************************************************************/

import { Database } from "../../../database.types";

type Blog = Database["public"]["Tables"]["blogs"]["Row"]


// 全記事を取得する非同期関数
const fetchBlogs = async () => {
  await new Promise(resolve => setTimeout(resolve, 6000)); // 6秒遅延させる

  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  });

  if(!res.ok) throw new Error("Failed to fetch Data");

  const blogs: Blog[] = await res.json();
  return blogs;
}


const BlogList = async () => {
  const blogs = await fetchBlogs();

  return(
    <div className="p-4">
      <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4">
        Blogs
      </p>

      <ul className="text-sm">
        { 
          blogs?.map(blog => (
            <li key={ blog.id } className="my-1 text-base">
              { blog.title }
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default BlogList;