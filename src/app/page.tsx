/**************************************************************



***************************************************************/
import { Suspense } from "react";

import NotesList from './components/notex-list'
import TimerCounter from './components/timer-counter'
import Spinner from "./components/spinner";
import RefreshBtn from "./components/refresh-button";


export default function Page() {
  return (
    <main className="">
      
      <div className="m-10 text-center">

        <p>Hello World</p>
        
        {/* NotesListはサーバーコンポーネントで表示が遅い。なのでSuspenseで囲ってローディングを使う */}
        <Suspense fallback={ <Spinner /> }>
          <NotesList />
        </Suspense>
        
        {/* TimerCounterはクライアントコンポーネントなのですぐに表示できるのでストリーミングHTMLを有効化する */}
        <TimerCounter />

        <RefreshBtn />

      </div>
      
    </main>
  )
}
