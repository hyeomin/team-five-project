import React from 'react'
import { resolutionType } from "@/components/recoil/atom";

function MyGoal({ id, title, content, dueDate, progress, user }: resolutionType) {



    return (
        <li key={id} className='border border-current'>
            <section>
                <p>{title}</p>
                <p>{content}</p>
                <span>{dueDate}</span>
                <div>Progress Bar</div>
            </section>
            <div>
                <button>X</button>
                <br/>
                <button>수정</button>
            </div>
        </li>
    )
}

export default MyGoal