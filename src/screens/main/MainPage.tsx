import { Link } from "react-router-dom";
import Logo from "./../../images/Itsy_logo_w_text.png";
import { Language } from "@/components/languange/language";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { EraserIcon } from '@radix-ui/react-icons'
import { DiscordLogoIcon } from '@radix-ui/react-icons'

const MainPage = () => {
  return (
    <div className=" flex flex-col  w-screen h-screen overflow-hidden  bg-background box-border ">
      {/* This is toaster in a simple words a pop up warning modal */}
      <div className="  w-full h-full absolute bottom-0 z-20 pointer-events-none overflow-hidden">
        <Toaster />
      </div>
      {/* This is toaster in a simple words a pop up warning modal */}


      {/* Naa dri ang navigation bar */}
      <nav className=" flex justify-around items-center w-full py-5 box-border px-6  ">
        <Link className=" w-[70%] sm:w-[50%]" to="/react-vite-supreme">
          <img
            className="object-contain h-12 m-0 sm:h-10 "
            src={Logo}
            alt="ITSY logo"
          />
        </Link>

        <div className="flex gap-3 w-[30%] sm:w-[50%] sm:gap-1 justify-end items-center">
          <Language />
          <ModeToggle />
        </div>
      </nav>
      {/* Naa dri ang navigation bar */}

      <div id="container" className=" relative h-full w-full flex px-6 gap-5 box-border  items-center pb-6   "> 
        {/* CARD 1 */}
        <div id="card-left" className=" sm:w-full relative bg-card border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center">
          <div id="card-left-container" className=" w-[95%] h-[95%] rounded-md flex flex-col  ">


            {/* This page is for chat on left container */}
            <div id="chat-part" className=" w-full h-full overflow-hidden relative border-[#48df48]  border-[1px] rounded-md">
              <div className="flex">

              </div>

            </div>
            {/* This page is for chat on left container */}





            {/* This page is for action on left container */}
            <div id="action-part-container" className=" sm:pt-7   flex w-full h-[200px] pt-8 flex-col  justify-between ">
              <div id="whole-action-container" className="flex justify-around w-full h-16 items-end ">
                <div id="input-and-button-container-not-preference" className=" sm:gap-4 flex items-end w-full h-full gap-8  ">
                  <div id="input-container" className="  flex gap-4 w-full max-w-[1020px]">
                    <Input type="text" placeholder="Name" />
                    <Input type="text" placeholder="Quantity/Weight" />
                  </div>
                  <div className=" flex sm:gap-1  sm:items-end  sm:flex-col sm:max-w-[80px] flex-row-reverse justify-between w-full  ">
                    <Dropdown text="Preference" />
                    <Button variant="default"  className="px-10 sm:w-full flex ">
                    Add  <span className="sm:hidden">-Items</span> 
                    </Button>
                    
                  </div>
                  
                </div>
          
              </div>
              {/* bottom controls */}




            <div className="flex w-full flex-row gap-4">
              
              <Button
              
                variant="outline"
                className=" w-24 text-accent-foreground sm:w-14"
                onClick={() => {
                  console.log("shit");
                  toast({
                    title: "Erase Everything ",
                    description: "Are you sure you want to erase?",
                  });
                }}
              >
              <EraserIcon className="sm:mr-0 mr-2 h-4 w-4 text-accent-foreground" />
              <span className=" sm:hidden">Erase</span>
              
              
              </Button>
              <Button
                className="px-10 w-full gap-2"
                onClick={() => {
                  console.log("shit");
                  toast({
                    title: "Generating Menus ",
                    description: "Please wait yawa",
                  });
                }}
              >
                Generate Menus
                <DiscordLogoIcon className="mr-2 h-4 w-4 text-accent text-xl"/>
                
              </Button>
            </div>
            </div>

          </div>
        </div>
         {/* This page is for action on left container */}

        {/* CARD 2 */}
        <div id="card-right-container" className=" sm:hidden relative  border-border bg-card  border-[1px] rounded-md w-[30%] h-full   box-border"></div>
      </div>
    </div>
  );
};

export default MainPage;
