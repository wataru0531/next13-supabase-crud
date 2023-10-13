/**************************************************************

auth/todo_crudページにログインしていなくても入れるので
それを阻止して、authページにリダイレクトさせる

***************************************************************/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // リクエストの型

// createMiddlewareSupabaseClient ... 非推奨
// ミドルウェアの中でsupabaseのインスタンスを生成できる
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";



export const middleware = async (req: NextRequest) => {
  // 
  const res = NextResponse.next();

  // ミドルウェアの中で使えるsupabaseのインスタンスを生成
  const supabase = createMiddlewareClient({ req, res })

  // ログインしているユーザーのセッション情報を取得
  const { data: { session } } =  await supabase.auth.getSession();

  // sessionがなく、ユーザーが /auth/todo-crud ページにアクセスしようとしている時
  // /auth のページにリダイレクトさせる
  if(!session && req.nextUrl.pathname.startsWith("/auth/todo-crud")){
    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = "/auth";

    return NextResponse.redirect(redirectUrl);
  }

  return res;
}