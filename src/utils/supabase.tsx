/**************************************************************

supabaseのクライアントのインスタンス

クライアントコンポーネントで使うSupabaseのインスタンスを生成してエクスポート

SupabaseのAuth Helpers for Next.jsを使用して、ブラウザクライアントを作成し、
それを指定されたデータベース型に関連付ける

***************************************************************/
// createBrowserSupabaseClient は非推奨
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "../../database.types"

// クライアントサイドで使えるsupabaseのインスタンスを生成
export default createPagesBrowserClient<Database>();
