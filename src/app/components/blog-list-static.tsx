/**************************************************************

blogsでデータフェッチを行うサーバーコンポーネント

***************************************************************/
import Link from "next/link";

import type { Database } from "../../../database.types";


type Blog = Database["public"]["Tables"]["blogs"]["Row"]



// 
const fetchBlogs = async () => {

  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: "no-store", // ダイナミックルーティング
  })

  if(!res.ok){
    throw new Error("Fail to fetch data in server");
  }

  const blogs: Blog[] = await res.json();

  return blogs;
}