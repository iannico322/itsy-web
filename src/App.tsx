import Logo from "./images/Itsy_logo_w_text.png";

import { Link } from "react-router-dom";

import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { useEffect } from "react";

import PhoneImg from "./images/mobile-iso-color.png";
import AIImg from "./images/ai.png";
import ScanImg from "./images/scan.png";
import MessageImg from "./images/message.png";
import BookImg from "./images/book.png";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
// import CryptoJS from "crypto-js";

function App() {
  const driverObj = driver({
    showProgress: true,
    showButtons: ['next', 'previous'],
    steps: [
      { 
        element: '#step1', 
        popover: { 
          title: `Hi, I'm Itsy!`, 
          description: `I'm an AI-powered recipe generator. Input your preferences, and I'll spin out personalized recipes for you. Start exploring with ITSY today!`, 
          side: "left", 
          align: 'start' 
        }
      },
      { 
        element: '#downloadAppButton', 
        popover: { 
          title: `Download the App`, 
          description: `You can download the ITSY app for a more personalized experience. The APK is hosted on Google Drive. Click here to download now!`, 
          side: "right", 
          align: 'start' 
        }
      },
      { 
        element: '#darkModeToggle', 
        popover: { 
          title: `Dark Mode`, 
          description: `Prefer a darker theme? Toggle this switch to enable Dark Mode and give your eyes a break!`, 
          side: "top", 
          align: 'start' 
        }
      },
      { 
        element: '#getStartedButton', 
        popover: { 
          title: `Get Started`, 
          description: `Ready to explore? Click here to get started and discover a web of culinary delights!`, 
          side: "bottom", 
          align: 'start' 
        }
      }
    ]
  });


  // this setups all the neccesary storage for its first boot
  // const encryptText = (plainText: string): string => {
  //   return CryptoJS.AES.encrypt(plainText, "itsy").toString();
  // };

  useEffect(()=>  {

   
      // localStorage.getItem('none')==null?localStorage.setItem('none','U2FsdGVkX18UQ2IN3040zHeBbni7vv1V3IxxQCKtFK8qVvVbd+1SZAApU5EQo2aptfrXD1Z4xfHRbYexqYJoIOSeBSA2gUymsQRoS6YvWcI='):""

      localStorage.setItem("demo","0")

      localStorage.getItem('none2')==null?localStorage.setItem('none2',
      'U2FsdGVkX19RVASTAa0UY10udMDNZXzZQZKuuz6bi/gNDotjwyyd9J25CrvWpYTYK9U2zZdgVyqmlv0V4++2hg8o3O+zlgswf1bPyL8EgrM='):""
      
      localStorage.getItem('user')==null?localStorage.setItem('user','0'):""
      localStorage.getItem('key')==null?localStorage.setItem('key','0'):""
      localStorage.getItem('count')==null?localStorage.setItem('count','0'):""


      localStorage.getItem('messages2')==null? localStorage.setItem('messages2','[{ "from": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'):""
      localStorage.getItem('messages')==null? localStorage.setItem('messages','[{ "from": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'):""
      localStorage.getItem('menus')==null? localStorage.setItem('menus','[]'):""
      localStorage.getItem("SelectedPrefence")==null?localStorage.setItem("SelectedPrefence", `["Simple"]`):""
      localStorage.getItem("Languange")==null?localStorage.setItem("Languange", `English`):""
  }, []);

  
  return (
    <div className="flex flex-col relative w-screen h-screen overflow-hidden bg-background">
      <nav className=" flex justify-around items-center w-full py-5 border-b-[1px] border-accent animate__animated animate__slideInDown  ">
        <Link id="step1" to="/itsy-web">
          <img className="object-contain h-12 " src={Logo} alt="ITSY logo" />
        </Link>

        <div className=" flex items-center gap-4" >
          <Button id="downloadAppButton" >
            <a href="https://drive.google.com/drive/u/0/folders/1MeVEI-Y91vpp7eWCwO9UcXjKcZmPHJau" target="_blank">
              Download App
            </a>
          </Button>

          <ModeToggle id="darkModeToggle" />
        </div>
      </nav>

      <div className="flex relative items-center justify-center w-full h-full bg-background">
        <div className=" flex z-10 w-full h-full justify-around items-center ">
          <div className=" animate__animated animate__fadeIn items-center justify-center translate-y-[-50px] flex w-2/3 rounded-lg max-w-[800px]  min-w-[320px] min-h-[400px] h-[60%] max-h-[500px] sm:max-h-[430px] border-[1px] border-border bg-card/20 backdrop-blur-md  " id="getStartedButton"> 
            <div id="step1" className="  flex flex-col md:justify-around w-[80%] h-[70%] gap-5 sm:gap-1">
              <h4 className=" text-3xl sm:text-xl font-bold text-[#3DD44B]">
                Welcome to ITSY
              </h4>
              <h1 className=" text-5xl sm:text-3xl font-bold text-[#3DD44B]">
                Your Web of Culinary Delights! 🕸️🍽️
              </h1>
              <p className=" mt-4 sm:mt-2 sm:text-sm text-accent-foreground">
                We’re an AI-powered recipe generator. Input your preferences,
                and we’ll spin out personalized recipes for you. Start exploring
                with ITSY today!
              </p>
              <div className=" flex gap-4 mt-5 sm:mt-4 " >
                <Button
                  variant="outline"
                  size="lg"
                  
                  className=" border-[#3DD44B]"
                >
                  <Link
                  
                    to="/itsy-web/itsy"
                    className=" text-[#3DD44B] sm:text-xs"
                  >
                    Get Started
                  </Link>
                </Button>

                <Button size="lg" onClick={()=>{
                  driverObj.drive();
                  localStorage.setItem("demo","1")
                }}>
                  
                    Show Demo
                  
                </Button>
              </div>
            </div>
          </div>

          <div className=" md:hidden"></div>
        </div>

        {/* Background HERE */}
        <div className=" z-0 flex absolute h-full w-full justify-around  items-center ">
          <div className=" md:hidden"></div>
          <div className="  translate-x-[60px] translate-y-[-50px] md:translate-x-0 items-center flex justify-center relative">
            <img
              src={ScanImg}
              alt="scan"
              className=" h-[230px] absolute object-contain animate-floatScan "
            />
            <img
              src={AIImg}
              alt="ai"
              className=" h-20 object-contain absolute  animate-floatAI "
            />
            <img
              src={PhoneImg}
              alt="phone"
              className=" h-[500px] opacity-100 object-contain  animate-float"
            />
            <img
              src={BookImg}
              alt="book"
              className=" h-[200px] absolute object-contain animate-floatBook "
            />
            <img
              src={MessageImg}
              alt="mess"
              className=" h-[140px] absolute object-contain animate-floatMess "
            />
          </div>
        </div>
        {/* Background HERE */}

        {/* 
        This is a capstone project, it was developed by a team of super smart students

          Ian Nico Caulin
          Mark Gil Rusian
          Marry Joy Colis
          Rishie ky Ravidas      
          
        ===============================================================================
        */}
      </div>
    </div>
  );
}

export default App;
