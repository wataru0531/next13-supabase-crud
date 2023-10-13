/**************************************************************

ニュースの一覧を取得するためのサーバーコンポーネント

***************************************************************/


import type { Database } from "../../../database.types";
import Counter from "./counter";

type News = Database["public"]["Tables"]["news"]["Row"]


// ニュースを全て取得する関数
const fetchNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const res = await fetch(`${process.env.url}/rest/v1/news?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  })

  if(!res.ok) {
    throw new Error("Failed to fetch data in server");
  }

  const news: News[] = await res.json();
  return news;
}


const NewsList = async () => {
  const news = await fetchNews();

  return(
    <div className="m-1 border border-blue-500 p-4">

      <Counter />

      <div className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        News
      </div>

      <ul className="m-3">
        { 
          news?.map(news => (
            <li key={ news.id }>
              <p>{ news.title }</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default NewsList;