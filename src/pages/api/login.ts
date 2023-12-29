import { supabase } from './supabase';

//회원가입
export const signUpHndlr = async (
  id: string,
  pw: string,
  nick: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setNickname: React.Dispatch<React.SetStateAction<string>>,
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  console.log('이것도 연결됨');
  try {
    const { data, error } = await supabase.auth.signUp({
      email: id,
      password: pw,
      options: {
        data: {
          nickname: nick,
        },
      },
    });
    if (error) console.error(error);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  setIsUser((prev: boolean) => !prev);
  setEmail('');
  setPassword('');
  setNickname('');
};

// 로그인
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
  console.log('로그아웃 성공');
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
