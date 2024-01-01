import React from 'react'

function HabitTracker({ onClickModalHandler, decimalDate }: any) {
    const dayList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    console.log('decimalDate',decimalDate)
    const checkBoxRendering = () => {
        const result = [];
        for (let i = 0; i <= decimalDate; i++) {
            result.push(<input type='checkbox' className='rounded-full border-2 appearance-none cursor-pointer checked:bg-gray-500 duration-150 w-[30px] h-[30px]'/>)
        }
        return result
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center'
            onClick={onClickModalHandler}>
            <div className='w-[800px] h-[600px] bg-white rounded-[15px]'
                onClick={(e) => e.stopPropagation()}>
                <div className='border-2 h-[50px] w-[150px] mt-10 ml-10 rounded-[10px] text-black'>
                    Frequency
                </div>
                <div className='flex border-2 h-[100px] justify-around m-10 rounded-[15px] items-center'>
                    {dayList.map((item) => {
                        return (
                            <div key={item} className='text-black text-center'>
                                <p>{item}</p>
                                <input type="checkbox" className='rounded-full border-2 appearance-none	w-[20px] h-[20px] cursor-pointer mt-3 checked:bg-gray-500 duration-150 ' />
                            </div>
                        )
                    })}
                </div>
                <div className='grid grid-cols-10 place-items-center
                text-black border-2 h-[200px] m-10 rounded-[15px]'>
                    {checkBoxRendering()}
                </div>
                <div className='text-black border-2 h-[50px] m-10 rounded-[10px]'>
                    Progress Bar
                </div>
            </div>
        </div>
    )
}

export default HabitTracker