/**************************************************************

SecondLayout secondセグメントの内容が入ってくる

/second となったとき
最上位のセグメントのlayoutは表示される
最上位のセグメントのpage.tsxの内容は表示されない

***************************************************************/



const SecondLayout = ({ children }: { children: React.ReactNode }) => {

  return(
    <div>
      <p>Layout 2</p>
      { children }
    </div>
  )
}

export default SecondLayout;