import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "./api/supabase";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const loadData = async () => {
    try {
      const { data, error } = await supabase.from("resolution").select();
      if (error) throw new Error();
      return data;
    } catch (err) {
      alert("데이터를 불러오지 못했습니다");
      return null;
    }
  }
  console.log('loadData', loadData())
  return (
  <div>
    <button>목표 추가하기</button>
    <button>수정</button>
    <button>X</button>
  </div>
  );
}
