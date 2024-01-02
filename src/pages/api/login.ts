import { supabase } from './supabase';

//회원가입
export const signUpHndlr = async (id: string, pw: string, nick: string) => {
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
    console.log('data: ', data);
    if (error) console.error(error);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// 로그인
export const signInHndlr = async (id: string, pw: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw,
    });
    if (!data.session) {
      return new Error();
    }
    return data;
  } catch (error) {
    console.error('데이터', error);
    return error;
  }
};

// //로그아웃
export const signOutHndlr = async () => {
  const { error } = await supabase.auth.signOut();
  console.log('에러', error);
  console.log('로그아웃 성공');
};

// 조회
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log('데이터', data, '에러', error);

  if (error) {
    console.error('에러 발생:', error.message);
    window.confirm('이미 등록된 이메일 입니다.');
  }
  if (!data.session) {
    console.log('로그인 상태가 아님');
  }
  if (data.session) {
    console.log('유저이메일 >>', data.session?.user.email as string);
    console.log(
      '유저닉네임 >>',
      data.session?.user.user_metadata?.nickname as string,
    );
    return data.session;
  }
};

export { supabase };
