/**************************************************************

・NEXT_PUBLIC...で読み込むとクライアントにもシークレットキーが送られてしまう
NEXT_PUBLICを使わずに小文字で定義してサーバー側で使えばクライアント側に送らなくて済む

・force-cache ... SSG キャッシュをCDNに残す
・no-store    ... SSR キャッシュを残さない。レンダリングのたびにデータ取得
・revalidate  ... ISR incremental  revalidation

***************************************************************/


import { Database } from "../../../database.types"; // 型をインポート
import { format } from "date-fns";

// 
type Note = Database["public"]["Tables"]["notes"]["Row"];

// 全記事取得API REST使用
async function fetchNotes() {
  // 非同期性がわかりやすいように意図的に2秒間遅延を入れる
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
    // ヘッダーにapikeyを付与する必要がある
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),

    // デフォルト force-cache
    cache: "no-store" // SSR 
    // next: { revalidate: 10 }, // ISR  指定秒数ごとにキャッシュを生成
  })

  if(!res.ok){
    throw new Error("Fail to fetch data in server")
  }

  const notes: Note[] = await res.json();
  // console.log(notes); //  {id: '216366cc-2724-49fe-91e3-eb73ca574fef',created_at: '2023-10-07T09:42:22.636836+00:00', title: 'Note 1' }
  
  return notes;
}


// サーバーコンポーネントは、コンポーネントレベルで、async / await を使うことが可能
const NotesList = async () => {
  // 全記事を取得
  const notes = await fetchNotes();

  return(
    <div>
      <p className="my-4 pb-3 text-xl font-medium underline underline-offset-4">
        Notes
      </p>

      <ul className="m-3">
        { 
        notes.map(note => (
          <li key={ note.id }>
            <h3>{ note.title }</h3>
            <p>
              <strong className="mr-3">Created at:</strong>
              {/* format(フォーマットしたい日付と時刻を持つ Date オブジェクト, 出力フォーマットの文字列パターン) */}
              { note && format(new Date(note.created_at), "yyyy-MM-dd HH:mm:ss") }
            </p>
          </li>
        ))
        
        }
      </ul>

    </div>
  )
}


export default NotesList;