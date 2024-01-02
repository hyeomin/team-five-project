import { supabase } from './supabase';

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
    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }
};

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

//로그아웃
export const signOutHndlr = async () => {
  const { error } = await supabase.auth.signOut();
};

// 조회
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('에러 발생:', error.message);
    window.confirm('이미 등록된 이메일 입니다.');
  }
  if (!data.session) {
    console.log('로그인 상태가 아님');
  }
  if (data.session) {
    return data.session;
  }
};

export { supabase };
