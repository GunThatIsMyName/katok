import { useRouter } from 'next/router'
import React from 'react'

const Mbti = () => {
    const router = useRouter();
    console.log(router)

    const handleCLick=()=>{
        console.log(router,"??")
    }
  return (
    <div>
        <button onClick={handleCLick} >Click</button>
    </div>
  )
}

export default Mbti