/**************************************************************

同じセグメントに、Loadingコンポーネントを作った場合には、自動的に
<Page />コンポーネントを囲う形になる。

イメージとしては、
<Layout>
  <ErrorBoundary fallback={ <Error /> }>
    <Suspense fallback={ <Loading /> }>
      <Page />

    </Suspense>

  </ErrorBoundary>
</Layout>

Page.tsxをラップしているので、そこにはないNavbarには影響がない


***************************************************************/


import Spinner from "./components/spinner";


const Loading = () => {

  return <Spinner color="border-green-500" />
}

export default Loading;