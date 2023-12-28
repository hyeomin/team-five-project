import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// //회원가입
// const signUpHndlr = async () => {
//   console.log('이것도 연결됨');
//   const { data, error } = await supabase.auth.signUp({
//     email: id,
//     password: pw,
//     options: {
//       data: {
//         nickname: nick,
//       },
//     },
//   });
// };

//로그인
// const signInHndlr = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: id,
//     password: pw,
//   });
//   console.log('데이터', data, '에러', error);
// };

export const signInHndlr = async (
  id: string,
  pw: string,
  setLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: id,
    password: pw,
  });
  console.log('데이터', data, '에러', error);
  setLogin((prev: boolean) => !prev);
  setEmail('');
  setPassword('');
};

// //소셜로그인
// const signInWithKakao = async () => {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'kakao',
//   });
//   console.log('카카오로그인정보', data);
// };

// //로그아웃
export const signOutHndlr = async (
  setLogin: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { error } = await supabase.auth.signOut();
  console.log('에러', error);
  setLogin((prev: boolean) => !prev);
};

// //조회
// const getCurrentSession = async () => {
//   const { data, error } = await supabase.auth.getSession();
//   console.log('데이터', data, '에러', error);
//   if (!data.session) {
//     setUser('로그인 상태가 아님');
//   }
//   if (data.session) {
//     setUser(data.session?.user.email as string);
//     setUserNick(data.session?.user.user_metadata?.nickname as string);
//   }
// };

export { supabase };
