


import Logo from './images/Itsy_logo_w_text.png'

import { Link } from "react-router-dom";

import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { useEffect } from 'react';

import { DownloadIcon } from '@radix-ui/react-icons'
import PhoneImg from './images/mobile-iso-color.png'
import AIImg from './images/ai.png'
import ScanImg from './images/scan.png'
import MessageImg from './images/message.png'
import BookImg from './images/book.png'

function App() {

  useEffect(()=>{

    localStorage.setItem("SelectedPrefence",`["Simple"]`)
    localStorage.setItem("Languange",`English`)


  },[])


  return (
   
     <div className="flex flex-col relative w-screen h-screen overflow-hidden bg-background">
      <nav className=" flex justify-around items-center w-full py-5 border-b-[1px] border-accent  ">
        <Link to="/react-vite-supreme" >
          <img className="object-contain h-12 " src={Logo} alt="ITSY logo" />
        </Link>
        
        <div className=" flex items-center gap-4" >
          <Button >
          <a href="#" target="_blank"  >Download App</a>
       
          </Button>

          <ModeToggle/>
        </div>
      </nav>
 

      

    
      <div className="flex relative items-center justify-center w-full h-full bg-background">



        <div className=' flex z-10 w-full h-full justify-around items-center '>
          <div className=' items-center justify-center translate-y-[-50px] flex w-2/3 rounded-lg max-w-[800px] min-w-[320px] min-h-[400px] h-[60%] max-h-[530px] sm:max-h-[630px] border-[1px] border-border bg-card/20 backdrop-blur-md '>
                
                <div className="flex flex-col md:justify-around w-[80%] h-[70%] gap-5 sm:gap-1">
                  <h4 className=' text-3xl sm:text-xl font-bold text-[#3DD44B]'>Welcome to ITSY</h4>
                  <h1 className=' text-5xl sm:text-3xl font-bold text-[#3DD44B]'>Your Web of Culinary Delights! 🕸️🍽️</h1>
                  <p className=' mt-4 sm:mt-2 sm:text-sm text-accent-foreground'>We’re an AI-powered recipe generator. Input your preferences, and we’ll spin out personalized recipes for you. Start exploring with ITSY today!</p>
                  <div className=' flex gap-4 mt-5 sm:mt-4'>
                    <Button variant="outline" size="lg" className=' border-[#3DD44B]'  >
                      <Link to="/react-vite-supreme/itsy" className=" text-[#3DD44B]">Get Started</Link>
                    </Button>

                    <Button  size="lg">
                      <a href='#' target='_blank'>Download App</a>
                    </Button> 

                  </div>
                
                
                </div>
          </div>

          <div className=' md:hidden'></div>
        </div>

      {/* Background HERE */}
        <div className=' z-0 flex absolute h-full w-full justify-around  items-center'>
          <div className=' md:hidden'>
          </div>
          <div className=' translate-x-[60px] translate-y-[-50px] md:translate-x-0 items-center flex justify-center relative'>
            <img src={ScanImg} alt="scan" className=' h-[230px] absolute object-contain animate-floatScan ' />
            <img src={AIImg} alt="ai" className=' h-20 object-contain absolute  animate-floatAI ' />
            <img src={PhoneImg}   alt="phone" className=' h-[500px] opacity-100 object-contain  animate-float' />
            <img src={BookImg} alt="book" className=' h-[200px] absolute object-contain animate-floatBook ' />
            <img src={MessageImg} alt="mess" className=' h-[140px] absolute object-contain animate-floatMess ' />
          </div>
        </div>
         {/* Background HERE */}
        

        {/* <p className=" text-accent-foreground">Welcome to ITSY Web</p>
        <Button variant="outline"  >
        <Link to="/react-vite-supreme/itsy" className=" text-accent-foreground">Get Started</Link>
        </Button>

        <Button >
        <Link to="/react-vite-supreme/page1">Download App</Link>
        </Button> 
        
        */}
        
  
      </div>
    </div>
   
  )
}



export default App
