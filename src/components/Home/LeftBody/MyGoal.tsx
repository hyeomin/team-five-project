'use client'

import React, { useState } from 'react'
import { resolutionType, fetchDataState } from "@/recoil/atom";
import { useRecoilState } from 'recoil';
import { supabase } from '@/pages/api/supabase';
import { editResolution } from '@/pages/api/resolutions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function MyGoal({ id, title, content, dueDate, progress, user }: resolutionType) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: editResolution,
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    })
    const [fetchData, setFetchData] = useRecoilState<resolutionType[]>(fetchDataState)

    // UpDate
    const [editState, setEditState] = useState(false)
    const [editValueState, setEditValueState] = useState(content)
    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditValueState(e.target.value)
    }
    const onClickEditHandler = async () => {
        setEditState(!editState)
        const params = { id: id, content: editValueState }
        if (editState) {
            const editContents = fetchData.map((item) => {
                return item.id === id ? { ...item, content: editValueState } : item
            })
            mutation.mutate(params)
            setFetchData(editContents)
            setEditState(false)
        }
    }

    // Delete
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
                {
                    editState
                        ? <textarea value={editValueState} onChange={onChangeHandler} ></textarea>
                        : <p>{editValueState}</p>
                }
                <span>{dueDate}</span>
                <div>Progress Bar</div>
            </section>
            <div>
                <button onClick={() => { onClickDeleteHandler(id) }}>X</button>
                <br />
                <button onClick={onClickEditHandler}>{editState ? '완료' : '수정'}</button>
            </div>
        </li>
    )
}

export default MyGoal