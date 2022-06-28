import { useRouter } from 'next/router'

import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { Button } from 'react-bootstrap';

const routeList = ["/", "/coins", "/news", "/coin"]

function MyApp({ Component, pageProps }) {
  const [mbti,setMbti]=useState(["A","B","C","D"])

  const { pathname } = useRouter();
  const router = useRouter();
  const [queryClient] =useState(()=>new QueryClient())

  const handleClick = (e) =>{
    const fakeMbti = [...mbti];
    const value =e.target.name;
    const mbtiIndex =e.target.dataset.mbti;
    fakeMbti.splice(mbtiIndex-1,1,value);
    setMbti(fakeMbti)
  }

  useEffect(()=>{
    console.log(router,"???")
    router.push(mbti.join(""));
  },[mbti])

  // if (!routeList.includes(pathname)) {

  //   return (
  //     <QueryClientProvider client={queryClient}>
  //       <Component {...pageProps} />
  //       <ReactQueryDevtools />
  //     </QueryClientProvider>
  //   )
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedProps} >
        <Navbar />
        <div className='bg-light h-100' >

        <h1>{mbti.join("")}</h1>
        <div className="d-flex justify-content-center align-items-center" > 
          <div className="d-flex flex-column">
          <Button name="A" data-mbti="1" onClick={handleClick} >A</Button>
          <hr />
          <Button name="ㄱ" data-mbti="1" onClick={handleClick} >ㄱ</Button>
          </div>
          <div className="d-flex flex-column">
          <Button name="B" data-mbti="2" onClick={handleClick} >B</Button>
          <hr />
          <Button name="ㄴ" data-mbti="2" onClick={handleClick} >ㄴ</Button>
          </div>
          <div className="d-flex flex-column">
          <Button name="C" data-mbti="3" onClick={handleClick} >C</Button>
          <hr />
          <Button name="ㄷ" data-mbti="3" onClick={handleClick} >ㄷ</Button>
          </div>
          <div className="d-flex flex-column">
          <Button name="D" data-mbti="4" onClick={handleClick} >D</Button>
          <hr />
          <Button name="ㄹ" data-mbti="4" onClick={handleClick} >ㄹ</Button>
          </div>
        </div>
          <Component {...pageProps} />
        </div>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
