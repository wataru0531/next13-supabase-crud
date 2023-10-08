/**************************************************************

headコンポーネント...特殊なファイル

タイトル、リンク、スクリプトを設定

***************************************************************/


const Head = () => {

  return(
    <>
      <title>Next.js App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="udemy講座" />

      <link rel="icon" href="/favicon.ico" />
    </>
  )
}


export default Head;