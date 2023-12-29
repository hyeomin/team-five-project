'use client'

import React from 'react'
import { resolutionType, fetchDataState } from "@/recoil/atom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { supabase } from '@/pages/api/supabase';


function MyGoal({ id, title, content, dueDate, progress, user }: resolutionType) {
    const [fetchData, setFetchData] = useRecoilState<resolutionType[]>(fetchDataState)
    const onClickDeleteHandler = async (id: number) => {
        const { error } = await supabase
            .from('resolution')
            .delete()
            .eq('id', id)
        console.log(error)
        setFetchData(fetchData.filter((item) => item.id !== id))
    }


    return (
        <li key={id} className='border border-current'>
            <section>
                <p>{title}</p>
                <p>{content}</p>
                <span>{dueDate}</span>
                <div>Progress Bar</div>
            </section>
            <div>
                <button onClick={() => { onClickDeleteHandler(id) }}>X</button>
                <br />
                <button>수정</button>
            </div>
        </li>
    )
}

export default MyGoal