import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../images/Itsy_logo_w_text.png";
import { Language } from "@/components/languange/language";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { StopIcon } from "@radix-ui/react-icons";
import { EraserIcon } from "@radix-ui/react-icons";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons"
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { LayersIcon } from "@radix-ui/react-icons";
import { UploadIcon } from "@radix-ui/react-icons";



import { useEffect,useState } from "react";


import EmtScreen from "./EmtScreen";
import UserMSG from "./components/messages/UserMSG";
import AIMSG from "./components/messages/AIMSG";
import OpenAIText, {cancelRequest }  from "./API's/OpenAIText";
import OpenAIImage from "./API's/OpenAIImage";
import SelectedPage from "./SelectedPage";
import MenuLoader from "@/components/loader/menuLoader";
import { Switch } from "@/components/ui/switch";
import SinSupFo from "../authentication/SinSupFo";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const MainPageAcc = () => {
  const navigate = useNavigate()
  const [callCount, setCallCount] = useState<number>(0);
  const [elementSelector, setelementSelector] = useState<any>("");

  
  useEffect(()=>{
    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    setelementSelector(isMobile ? '#menus2' : '#card-right-container');
  },[])


  const driverObj = driver({
    showProgress: true,
    showButtons: ['next', 'previous'],
    steps: [
      { 
        element: '#step1', 
        popover: { 
          title: `👋 Hiya! Welcome to Itsy!`, 
          description: `This is Itsy's guest account. Ready to see some magic? 🎩✨`, 
          side: "left", 
          align: 'start' 
        }
      },
      { 
        element: '#card-left', 
        popover: { 
          title: '🗨️ Itsy Chit-Chat', 
          description: `This is our little chit-chat corner. Just tell me your food items, and I'll whip up a dish you'll surely love! 🍽️❤️`, 
          side: "left", 
          align: 'start'  
        }
      },
      { 
        element: '#upload', 
        popover: { 
          title: '🔍 Magic Food Scanner', 
          description: `Tap this magical button and poof! 🎩✨ I can identify your food, whether it's handwritten, a list, or a group of food. Give it a whirl! 🍲💫`, 
          side: "left", 
          align: 'start'  
        }
      },
      { 
        element: '#input-container', 
        popover: { 
          title: '📝 Manual Food Entry', 
          description: 'Oops! If I missed any of your foods, just tap here and fill in the blanks. Remember, a number for quantity and a cute label would be perfect! 🍎5️⃣ Give it a try!', 
          side: "left", 
          align: 'start'  
        }
      },
      { 
        element: '#addItem', 
        popover: { 
          title: '🍽️ Add Food Now', 
          description: 'All set? Tap this button to add your food item to your list. Bon appétit! 🎉', 
          side: "left", 
          align: 'start'  
        }
      },     
      { 
        element: '#generate', 
        popover: { 
          title: `🍽️ Itsy's Kitchen Time`, 
          description: `Got your food items ready? Tap this magical button and I'll whip up some yummy dishes for you! Just a heads up, it might take a little while. 🎩✨`, 
          side: "left", 
          align: 'start'  
        }
      },
      { 
        element: elementSelector, 
        popover: { 
          title: `🍽️ Yummy Menus Corner`, 
          description: `This is where the magic happens! I'll display the scrumptious dishes I've whipped up for you right here. 🎩✨🍲 `, 
          side: "left", 
          align: 'start'  
        }
      }
      ,
      { 
        element: '#language', 
        popover: { 
          title: '🌍 Language Switch', 
          description: 'Guess what? I can speak different languages! Well, at least for the food menus. Give it a try later! 🎩✨', 
          side: "left", 
          align: 'start'  
        }
      },
      { 
        element: '#pref', 
        popover: { 
          title: '🍽️ Your Flavor Adventure', 
          description: `Ready for a flavor adventure? Pick your food preferences here! Just a tiny note, choices are a smidge limited right now. 🎉`, 
          side: "left", 
          align: 'start'  
        }
      },
      { 
        element: '#account', 
        popover: { 
          title: '👤 Create Account or Sign In', 
          description: `Hi! An account is crucial for full access. Without it, your usage is limited. After signing up, activate your account via the Gmail link Itsy sends. 🚀📧`, 
          side: "left", 
          align: 'start'  
        }
      }
      
    ]
  });



  useEffect(()=>{
    
    
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem('date');
    const storedCount = localStorage.getItem('callCount');

    if (storedDate === null || storedDate !== currentDate) {
      localStorage.setItem('date', currentDate);
      localStorage.setItem('callCount', '0');
      setCallCount(0);
    } else {
      setCallCount(parseInt(storedCount || '0'));
    }
    if (localStorage.getItem("key")!="0"||localStorage.getItem("user")!="0") {
      navigate("/itsy-web/main")
    }
    if (localStorage.getItem("demo")=="1") {
      driverObj.drive();
      
    }


  },[])

  const limitedCallFunction = (num:any) => {
    if (callCount < 10) {
      // Your function logic goes here

      const newCount = callCount + num;
      localStorage.setItem('callCount', newCount.toString());
      setCallCount(newCount);
    } else {
     
      
      
      console.log('No more function available.');
    }
  };

  
  type MessageType = {
    role: string;
    products: any;
    direction: any;
    message: any;
    image: any;
  };

  type MenuType = {
    name: string;
    ingredients: string[];
    cooking_steps: string[];
  
  };

  const [messages, setMessages] = useState<MessageType[]>(
    JSON.parse(localStorage.getItem("messages") || "")
  );

  const [items, setItem]: any = useState({ name: "", quantity: "" });
  const [pageAtChat, setpageAtChat] = useState(true);
  const [menus,setMenus] = useState <MenuType[]> (JSON.parse(localStorage.getItem("menus") || ""));
  const [SelectedMenu, SetSelectedMenu] = useState<MenuType>({
    name: "",
    ingredients: [],
    cooking_steps: [],
  
  })


  const [viewMenu,SetViewMenu] = useState(false)
  const [viewAccount,SetviewAccount] = useState(false)

  const [loading,SetLoading]= useState(false)
  const [isChecked, setIsChecked] = useState(localStorage.getItem('mode-4') === 'true');


//this auto save the messages of the users
useEffect(() => {
  const element: any = document.querySelector("#bottom-scroll");
  element.scrollIntoView(false);
  console.log(messages);
  localStorage.setItem("messages", JSON.stringify(messages));
}, [messages]);


//this auto save the menus of the users
useEffect(() => {
  console.log(menus);
  localStorage.setItem("menus", JSON.stringify(menus));
}, [menus]);




  


  function deleteItem(indexMain: any, indexToDelete: any) {

    console.log(indexMain, indexToDelete)

    // Create a new products array for the new message that excludes the removed product
    let newProducts = messages[indexMain].products.filter((_:any, index:any) => index !== indexToDelete);

    // Add a new message with the new products array
    setMessages([...messages, {
      products: newProducts,
      message: "This is my updated Item",
      direction: "outgoing",
      role: "user",
      image: "",
    }]);
  }

  function replyChatBeforeRES() {
  
      setMessages([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `🕸️Hello, dear! Like a diligent spider 🕷️, I’m spinning your menus. Your patience is as precious as dew on a web. I’m fetching your menus! 🌼

          Please wait while I’m searching for your menus…`,
          direction: "outgoing",
          role: "assistant",
          image: "loading",
        },
      ])
   
  }





  //This function add items to the messages object
  function addItems() {
    if (items.name=="" || items.quantity=="") {
      toast({
        title: "Oopsie My Dear!",
        description: "Hold on, sweetie! Make sure all the little boxes are filled.",
      });
      
    }else{
      let next = document.querySelector('.driver-popover-next-btn') as HTMLElement | null;
      next?.click();
        
     console.log({ name: items.name, quantity: items.quantity })
      setMessages([
        ...messages,
        {
          products: messages[messages.length - 1].products.concat([{ name: items.name, quantity: items.quantity }]),
          message: "This is my updated Item",
          direction: "outgoing",
          role: "user",
          image: "",
        },
      ])
   
    setItem({ name: "", quantity: "1" });
    }
    
  }


  const uploadImage= (event:any)=> {
    let next = document.querySelector('.driver-popover-next-btn') as HTMLElement | null;
    next?.click();

    limitedCallFunction(0)
    if (callCount > 9) {
      toast({
        title: "ITSY whoopsyyy!",
        description: "You have reach your usage limit today, please comeback tommorow or register an account for unlimited usage.",
      });
      
    }else{
      //this code here run after uploading image
    toast({
      title: "Analyzing Image...",
      description:
        "Please hold on, I’m analyzing your image…...!",
    });

      setMessages([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `Could you please identify the food items in this image?`,
          direction: "outgoing",
          role: "user",
          image: URL.createObjectURL(event.target.files[0]),
        },
        {
          products: [...messages[messages.length - 1].products],
          message: `🕸️Greetings! I’m currently processing your image. Please hold on for a moment…`,
          direction: "outgoing",
          role: "assistant",
          image: "loading",
        },
      ])
    //this code here use the image recognization component then executes codes just like axios process
    OpenAIImage({ image: event.target.files[0] }).then((results:any[]) => {
      console.log("Scan Result:");
      console.table(results);


      results[0].warning?
    
        setMessages([
          ...messages,
          {
            products: [...messages[messages.length - 1].products],
            message: `Could you please identify the food items in this image?`,
            direction: "outgoing",
            role: "user",
            image: URL.createObjectURL(event.target.files[0]),
          },
          {
            products: [...messages[messages.length - 1].products],
            message: `🕸️Hello, I’ve finished scanning your items. Unfortunately, no food items were detected. Thank you for your patience`,
            direction: "outgoing",
            role: "assistant",
            image: "",
          }
        ]) 

        
      : 
      
      setMessages([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `Could you please identify the food items in this image?`,
          direction: "outgoing",
          role: "user",
          image: URL.createObjectURL(event.target.files[0]),
        },
        {
          products: [...messages[messages.length - 1].products,...results ],
          message: `🕸️Hello, I’ve finished scanning your items. Thank you for your patience`,
          direction: "outgoing",
          role: "assistant",
          image: "",
        },
        {
          products: [...messages[messages.length - 1].products,...results],
          message: `Could you please identify the food items in this image?`,
          direction: "outgoing",
          role: "user",
          image: "",
        },
        
      ])

      toast({
        title: "Done",
        description:
          "Hello, I’ve finished scanning your items!",
      });

      limitedCallFunction(1)
    
    
    
    });


    }

    

  }


  // this function gets the value of the source and update it
const handleKeyDown = (event: any) => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed');
    addItems()
  
  }
}

  // this function gets the value of the source and update it
  const onChangeInput = (e: any) => {
    
    setItem({
      ...items,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className=" flex flex-col  w-screen h-screen overflow-hidden  bg-background box-border ">
      <div className={viewAccount?"   overflow-hidden flex w-screen h-screen absolute z-50 bg-black/70  items-center justify-center ":"hidden"}>
       
        <SinSupFo 
        
        viewopt={
          ()=>{
          SetviewAccount(false)
          }}
        />
      </div>

      {/* This is toaster in a simple words a pop up warning modal */}
      <div className="  w-full h-full absolute bottom-0 z-20 pointer-events-none overflow-hidden">
        <Toaster />
      </div>
      {/* This is toaster in a simple words a pop up warning modal */}

      {/* Naa dri ang navigation bar */}
      <nav className=" flex justify-between items-center w-full py-5 box-border px-6  ">
        <Link className=" w-[20%] min-w-[100px] "
        to="/itsy-web" >
          <img
          id="step1"
            className="object-contain h-12 m-0 sm:h-8  "
            src={Logo}
            alt="ITSY logo"
          />
        </Link>

        <div className="flex gap-3 w-[50%]  md:w-[75%] sm:gap-1 justify-end items-center">
          <Button
            id="account"
            variant="default"
            className="px-5 sm:w-full flex sm:text-xs   "
            onClick={()=>{
              let next = document.querySelector('.driver-popover-next-btn') as HTMLElement | null;
              next?.click();

              SetviewAccount(true)
            }}
          >
            Use My Account
          </Button>
          <Language id="language" />
          <ModeToggle  />
        </div>
      </nav>
      {/* Naa dri ang navigation bar */}

      {/* Mobile Navigation only shows when screen is sm */}
      <div id="menus" className=" hidden sm:flex w-full h-10 items-center z-30   gap-3 justify-center text-accent-foreground/80 text-xs ">
        <p
          className=" flex gap-2 items-center hover:text-[#3dd44b] hover:cursor-pointer  "
          onClick={() => {
            setpageAtChat(true);
            SetViewMenu(false);
          }}
        >
          {" "}
          <ChatBubbleIcon className="sm:mr-0 mr-2 h-4 w-4 " /> Chat
        </p>
        |
        <p
         id="menus2"
          className=" relative flex gap-2 items-center hover:text-[#3dd44b] hover:cursor-pointer "
          onClick={() => {
            setpageAtChat(false);
            SetViewMenu(false);
          }}
        >
          {" "}
          Menus <LayersIcon className="sm:mr-0 mr-2 h-4 w-4 " />
          <span
            className={
              menus.length == 0
                ? " pointer-events-none text-[10px] translate-y-[-8px] translate-x-2 absolute right-0 h-4 w-4 bg-red-500  text-accent hidden items-center justify-center rounded-full"
                : " pointer-events-none text-[10px] translate-y-[-8px] translate-x-2 absolute right-0 h-4 w-4 bg-red-500  text-accent flex items-center justify-center rounded-full "
            }
          >
            {menus.length}
          </span>
        </p>
      </div>
      {/* Mobile Navigation only shows when screen is sm */}

      <div
        id="container"
        className=" relative h-full w-full flex px-6 sm:pb-0 gap-5 box-border justify-center  items-center pb-6 overflow-hidden sm:flex-col   "
      >
        <div
          className={
            viewMenu
              ? " absolute h-[97.2%] w-full flex px-6 sm:pb-0 gap-5 box-border justify-center  items-center  overflow-hidden sm:flex-col pointer-events-none "
              : " hidden absolute h-full w-full px-6 sm:pb-0 gap-5 box-border justify-center  items-center  overflow-hidden sm:flex-col pointer-events-none "
          }
        >
          <div className=" relative sm:absolute z-30 sm:h-[95%] sm:w-[97%] flex bg-card border-border border-[1px] rounded-md w-[70%] h-full flex-col  box-border  items-center justify-center pointer-events-auto p-5">
            <SelectedPage
              SelectedMenu={SelectedMenu}
              back={() => {
                SetViewMenu(false);
              }}
            />
          </div>
          <div className=" sm:hidden relative  w-[30%] h-full  pointer-events-none"></div>
        </div>

        {/* CARD 1 */}
        <div
          id="card-left"
          className={
            pageAtChat
              ? " sm:absolute sm:h-[95%] sm:w-[97%] relative bg-card border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center"
              : " sm:absolute sm:h-[95%] sm:w-[97%] relative bg-card sm:hidden border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center"
          }
        >
          <div id="uploading-image-layer-1" className=" w-[95%] h-[95%] rounded-md flex flex-col box-border  absolute z-100 pointer-events-none ">
          
            
            <div className=" relative h-full w-full  gap-5   flex items-end justify-end  ">
            <div className="  absolute  z-20 pointer-events-none flex gap-3  left-0 bottom-0 p-5 ">
              
              <p className=" animate__animated animate__fadeInLeft animate__delay-1s  text-accent-foreground sm:text-xs ">Usage: <span className=" text-primary text-xl">{localStorage.getItem('callCount')}</span>/10</p>
            </div>

              <label
              id="upload"
                htmlFor="file-upload"
                className=" animate__animated animate__fadeInUp animate__delay-2s  border-[1px] border-border flex items-center justify-center   px-3 py-2 w-30 cursor-pointer text-accent-foreground sm:m-3 m-7 bg-background/20 backdrop-blur-sm rounded-md text-sm hover:bg-accent  z-20 pointer-events-auto sm:text-xs "
              >
                <UploadIcon className="sm:mr-2 mr-2 sm:h-[14px] sm:w-[14px]  h-4 w-4 " />
                Upload
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden "
                accept=".jpg,.jpeg,.png"
                onChange={uploadImage}
              />

              {/* <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={uploadImage}
              /> */}

              
              <div className="  z-20 pointer-events-auto flex gap-3 items-center  absolute top-0 p-5 sm:p-2 ">
              <Switch
             
             checked={isChecked}
              onCheckedChange={(e)=>{
                setIsChecked(e)
                localStorage.setItem('mode-4',`${e}`)
                console.log("mode-4:", e)
              }} />
              <p className=" text-primary sm:text-sm text-center">GPT-4</p>
            </div>

            
            </div>
            <div className=" sm:pt-7 flex w-full h-[200px] pt-8 flex-col  justify-between  "></div>
          </div>


          <div
            id="card-left-container-layer-2"
            className=" w-[95%] h-[95%] rounded-md flex flex-col box-border  "
          >
            {/* This page is for chat on left container */}

            <div
              id="chat-part"
              className=" w-full h-full overflow-y-scroll relative border-[#48df48]  border-[1px] rounded-md"
            >
              <div
                className=" relative min-h-[400px] w-full flex flex-col gap-5 items-center py-5 pb-16 sm:pb-11   "
                id="bottom-scroll"
              >

      {/* this code here iterate the object value and direct it the the component where it belongs */}
                {messages.length >= 2 ? (
                  messages.map((e, key) =>
                    e.role != "user" ? (
                      <AIMSG e={e} key={key} />
                    ) : (
                      <UserMSG
                        e={e}
                        mkey={key}
                        key={key}
                        onDelete={deleteItem}
                      />
                    )
                  )
                ) : (
                  <EmtScreen />
                )}
       {/* this code here iterate the object value and direct it the the component where it belongs */} 
              </div>
            </div>
            {/* This page is for chat on left container */}

            {/* This page is for action on left container */}
            <div
              id="action-part-container"
              className=" sm:pt-7   flex w-full h-[200px] pt-8 flex-col  justify-between "
            >
              <div
                id="whole-action-container"
                className="flex justify-around w-full h-16 items-end "
              >
                <div
                  id="input-and-button-container-not-preference"
                  className=" sm:gap-4 flex items-end w-full h-full gap-8  "
                >
                  <div
                    id="input-container"
                    className="  flex gap-4 w-full max-w-[1020px]"
                  >

                    
                    <Input
                      type="text"
                      placeholder="Name"
                      value={items.name}
                      name="name"
                      onChange={onChangeInput}
                      onKeyDown={handleKeyDown}
                    />
                    <Input
                      type="text"
                      placeholder="Quantity"
                      value={items.quantity}
                      name="quantity"
                      onChange={onChangeInput}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className=" flex sm:gap-1  sm:items-end  sm:flex-col sm:max-w-[80px] flex-row-reverse justify-between w-full  ">
                    <Dropdown text="Preference" id="pref" />
                    <Button
                    id="addItem"
                      variant="default"
                      className="px-10 sm:w-full flex "
                      onClick={addItems}
                    >
                      Add <span className="sm:hidden">-Items</span>
                    </Button>
                  </div>
                </div>
              </div>
              {/* bottom controls */}

              <Button
                variant="outline"
                className={
                  loading
                    ? " animate__animated animate__fadeInUp min-w-24 text-accent-foreground  absolute  flex self-center  gap-2  mt-[40px] "
                    : " min-w-24 text-accent-foreground  absolute   self-center  gap-2  translate-y-[40px] animate-pulse hidden "
                }
                onClick={() => {
                  cancelRequest();
                }}
              >
                <StopIcon className="sm:mr-0 mr-2 h-4 w-4 text-accent-foreground animate-spin  " />
                Stop Responding
              </Button>

              <div className="flex w-full flex-row gap-4 relative">

                {/* this button clear the data in side the message storage */}
                <Button
                  variant="outline"
                  className=" w-24 text-accent-foreground sm:w-14"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Sure to erase? No magic can bring it back!"
                      )
                    ) {
                      localStorage.setItem(
                        "messages",
                        '[{ "role": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'
                      );
                      setMessages(
                        JSON.parse(localStorage.getItem("messages") || "")
                      );

                      localStorage.setItem("menus", "[]");
                      setMenus(JSON.parse(localStorage.getItem("menus") || ""));

                      toast({
                        title: "Poof! All Gone!",
                        description:
                          "Everything's been swept away, as clean as your messenger box!",
                      });
                    } else {
                      toast({
                        title: "Erase Cancelled! ",
                        description:
                          "Oh, you decided to stick around... Let's keep making memories together!",
                      });
                    }
                  }}
                >
                  <EraserIcon className="sm:mr-0 mr-2 h-4 w-4 text-accent-foreground" />
                  <span className=" sm:hidden">Erase</span>
                </Button>
                {/* this button clear the data in side the message storage */}
                

                {/* this button call the openai menu generator component and throw a bunch of code the the developer forgots how it works */}
                <Button
                  disabled={loading ? true : false}
                  id="generate"
                  className="px-10 w-full gap-2"
                  onClick={() => {

                    let next = document.querySelector('.driver-popover-next-btn') as HTMLElement | null;
                    next?.click();

                    limitedCallFunction(0)

                    if (callCount > 9) {
                      toast({
                        title: "ITSY whoopsyyy!",
                        description: "You have reach your usage limit today, please comeback tommorow or register an account for unlimited usage.",
                      });
                      
                    }else{
                      
                    toast({
                      title: "Loading... ",
                      description: "Please wait for i searching for your menus",
                    });

                    let product: any = [];
                    messages[messages.length - 1].products.map(
                      (e: any) =>
                        (product = [...product, `${e.quantity} ${e.name}`])
                    );

                    console.log(product.join(" "));

                    replyChatBeforeRES();

                    SetLoading(true);



                      OpenAIText({ product: `${product.join(",")}` })
                      .then((result: any[]) => {
                        console.log("Menu API Response");
                        console.table(result);

                        if (result.length == 0) {
                          toast({
                            title: "Stop Responding!",
                            description:
                              "Your request for cancellation of menu has been successfully implemented",
                          });
                          SetLoading(false);

                          messages.map((e: any) =>
                            setMessages([
                              ...messages,
                              {
                                products: [...e.products],
                                message: `Your request for cancellation of menu has been successfully implemented!`,
                                direction: "outgoing",
                                role: "assistant",
                                image: "",
                              },
                            ])
                          );
                        } else {
                          SetLoading(false);
                          setMenus(result);
                          toast({
                            title: "DONE... ",
                            description: "Here are your menus",
                          });

                          if (result) {
                            let menus_name: any = [];

                            result.map((e: any, key: any) => {
                              menus_name = [
                                ...menus_name,
                                `${key + 1}. ${e.name}`,
                              ];
                            });

                            messages.map((e: any) =>
                              setMessages([
                                ...messages,
                                {
                                  products: [...e.products],
                                  message: `🕸️Hello, dear! Like a diligent spider 🕷️, your menus are spun. Thanks for your patience, as precious as dew on a web. Enjoy your menus!
            
                                  Here are your menus:
                                  ${menus_name.join(" \n")} \n`,
                                  direction: "outgoing",
                                  role: "assistant",
                                  image: "",
                                },
                              ])
                            );

                            limitedCallFunction(1)
                          }
                        }
                      })
                      .catch((error: any) => {
                        SetLoading(false);
                        console.log(error);
                      });

                    }
                    
                  }}
                >
                  Generate Menus
                  {loading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <DiscordLogoIcon className="mr-2 h-4 w-4 text-accent text-xl" />
                  )}
                </Button>
                {/* this button call the openai menu generator component and throw a bunch of code the the developer forgots how it works */}

              </div>
            </div>
          </div>
        </div>

        {/* This page is for action on left container */}

        {/* CARD 2 */}
        <div
          id="card-right-container"
          className={
            pageAtChat
              ? "sm:hidden sm:absolute sm:w-[97%] flex sm:h-[95%]  border-border bg-card    relative   border-[1px] rounded-md w-[30%] h-full  box-border p-5 flex-col sm:p-2  "
              : "sm:absolute sm:w-[97%] flex sm:h-[95%]  border-border bg-card    relative   border-[1px] rounded-md w-[30%] h-full  box-border p-5 flex-col sm:p-2  "
          }
        >
          {/* title here */}
          <div className=" w-full min-h-[10px] pb-4 text-accent-foreground/90 flex items-center flex-col text-center">
            <p className=" text-lg font-bold">Food You can cook</p>
            <p className=" text-sm text-accent-foreground/70">
              Click view to view recipe and cooking steps
            </p>
          </div>
          {/* title here */}

          {/* container of menus here */}
          <div className=" h-full w-full border-[#3dd44b] border-[1px] rounded-md flex flex-col gap-4 py-5">
            {loading ? (
              <MenuLoader />
            ) : menus.length != 0 ? (
              menus.map((e, key) => (
                <div
                  className="flex w-full justify-between px-6 items-center"
                  key={key}
                >
                  <h1 className=" text-sm  text-accent-foreground max-w-[60%] text-left">
                    {" "}
                    {key + 1}. {e.name}
                  </h1>
                  <Button
                    size="sm"
                    onClick={() => {
                      SetViewMenu(true);
                      SetSelectedMenu(e);
                    }}
                  >
                    View
                  </Button>
                </div>
              ))
            ) : (
              ""
            )}
          </div>
          {/* container of menus here */}
        </div>
      </div>
    </div>
  );
};

export default MainPageAcc;
