import React from 'react'

function dataCard({title,value}) {
  return (
    <div className='flex flex-col bg-white h-[50] w-[60] '>
        {title}
        {value}
        50
    </div>
  )
}

export default dataCard