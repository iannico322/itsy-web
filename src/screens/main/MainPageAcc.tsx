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
import { Nav } from "@/components/nav/nav";
import { useNavigate } from "react-router-dom";
import axios from './../../plugins/axios';



const MainPage = () => {
  const navigate = useNavigate()

  const [messages, setMessages] = useState<MessageType[]>(
    JSON.parse(localStorage.getItem("messages2") || "")
  );

    async function GetMessageStart() {

     await axios.get(`message/user/${JSON.parse(localStorage.getItem('user')||"").id}`,
      {
      headers: {
        Authorization: `Token ${localStorage.getItem("key")}`,
      }, 
    }).then( async (res)=>{
      if (res.data.length ==0) {
         await axios.post(`message/all/`,
              {

                "userID": JSON.parse(localStorage.getItem('user')||"").id,
                "messageContent": JSON.stringify(messages)
              }
            ,{
              headers: {
                Authorization: `Token ${localStorage.getItem("key")}`,
              }, 
            }).then((ress)=>{
              localStorage.setItem("mID",ress.data.messageID)
              setMessages(
                JSON.parse(localStorage.getItem("messages2") || "")
              );
            })
      }else{
         await axios.get(`message/user/${JSON.parse(localStorage.getItem('user')||"").id}`
            ,{
              headers: {
                Authorization: `Token ${localStorage.getItem("key")}`,
              }, 
            }).then((ress)=>{      
              // console.log(ress.data[0].messageContent)
              setMessages(JSON.parse(ress.data[0].messageContent))
            })
      }

    })
    
  }  



  async function PostMessage(message:any) {

    axios.post(`message/all/`,
      {
        "userID": JSON.parse(localStorage.getItem('user')||"").id,
        "messageContent": JSON.stringify(message)
      }

    ,{
      headers: {
        Authorization: `Token ${localStorage.getItem("key")}`,
      }, 
    }).then((res)=>{
      console.log(res.data)
    })
    
  }

  useEffect(() => {
    if (localStorage.getItem("key") === "0" || localStorage.getItem("user") === "0") {
        navigate("/itsy-web/");
    }
    GetMessageStart();
    console.log("hhehehe")
    // PostMessageStart(JSON.stringify(messages));
}, [])



  
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

  const [items, setItem]: any = useState({ name: "", quantity: "" });
  const [pageAtChat, setpageAtChat] = useState(true);
  const [menus,setMenus] = useState <MenuType[]> (JSON.parse(localStorage.getItem("menus") || ""));
  const [SelectedMenu, SetSelectedMenu] = useState<MenuType>({
    name: "",
    ingredients: [],
    cooking_steps: [],
  
  })


  const [viewMenu,SetViewMenu] = useState(false)
  const [loading,SetLoading]= useState(false)
  const [isChecked, setIsChecked] = useState(localStorage.getItem('mode-4') === 'true');


//this auto save the messages of the users


useEffect(() => {
  const element: any = document.querySelector("#bottom-scroll");
  element.scrollIntoView(false);
  
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

    PostMessage([...messages, {
      products: newProducts,
      message: "This is my updated Item",
      direction: "outgoing",
      role: "user",
      image: "",
    }])
  }

  function replyChatBeforeRES() {
  
      setMessages([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `Hello, dear! Like a diligent spider , I’m spinning your menus. Your patience is as precious as dew on a web. I’m fetching your menus! 

          Please wait while I’m searching for your menus…`,
          direction: "outgoing",
          role: "assistant",
          image: "loading",
        },
      ])

      PostMessage([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `Hello, dear! Like a diligent spider , I’m spinning your menus. Your patience is as precious as dew on a web. I’m fetching your menus! 

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

      PostMessage([
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
          message: `Greetings! I’m currently processing your image. Please hold on for a moment…`,
          direction: "outgoing",
          role: "assistant",
          image: "loading",
        },
      ])

      PostMessage([
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
          message: `Greetings! I’m currently processing your image. Please hold on for a moment…`,
          direction: "outgoing",
          role: "assistant",
          image: "loading",
        },
      ])


  

    //this code here use the image recognization component then executes codes just like axios process
    OpenAIImage({ image: event.target.files[0] }).then((results:any[]) => {
      console.log("Scan Result:");
      console.table(results);


      if(results[0].warning){
    
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
            message: `Hello, I’ve finished scanning your items. Unfortunately, no food items were detected. Thank you for your patience`,
            direction: "outgoing",
            role: "assistant",
            image: "",
          }
        ]),

        PostMessage([
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
            message: `Hello, I’ve finished scanning your items. Unfortunately, no food items were detected. Thank you for your patience`,
            direction: "outgoing",
            role: "assistant",
            image: "",
          }
        ]) 

     }{

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
          message: `Hello, I’ve finished scanning your items. Thank you for your patience`,
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
      PostMessage([
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
          message: `Hello, I’ve finished scanning your items. Thank you for your patience`,
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

      
     }
     toast({
      title: "Done",
      description:
        "Hello, I’ve finished scanning your items!",
    });
      
      
     
    
    
    
    });

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


      

      {/* This is toaster in a simple words a pop up warning modal */}
      <div className="  w-full h-full absolute bottom-0 z-20 pointer-events-none overflow-hidden">
        <Toaster />
      </div>
      {/* This is toaster in a simple words a pop up warning modal */}

      {/* Naa dri ang navigation bar */}
      <nav className=" flex justify-between items-center w-full py-5 box-border px-6  ">
  
        <div className=" flex gap-2 sm:gap-0 w-[20%] min-w-[100px] ">
          <img
            className="object-contain h-12 m-0 sm:h-7  "
            src={Logo}
            alt="ITSY logo"
          />
          <div className=" h-6 sm:h-3 rounded-lg w-12 sm:w-7  bg-[#3dd44b] flex items-center justify-center">
            <p className="  text-xs text-accent sm:text-[5px]">Plus</p>
          </div>
            

        </div>

        <div className="flex gap-3 w-[50%]  md:w-[75%] sm:gap-1 justify-end items-center">
          {/* <Button
            variant="default"
            className="px-5 sm:w-full flex sm:text-xs   "
            onClick={()=>{
           
            }}
          >
            Use My Account
          </Button> */}
          <Nav/>
          <Language />
          <ModeToggle  />
        </div>
      </nav>
      {/* Naa dri ang navigation bar */}

      {/* Mobile Navigation only shows when screen is sm */}
      <div className=" hidden sm:flex w-full h-10 items-center z-30   gap-3 justify-center text-accent-foreground/80 text-xs ">
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
            
          
            
            
            <div className=" h-full w-full  gap-5   flex items-end justify-end  ">
            
            
              <label
                htmlFor="file-upload"
                className=" animate__animated animate__fadeInUp animate__delay-2s  border-[1px] border-border flex items-center justify-center  px-3 py-2 w-30 cursor-pointer text-accent-foreground m-7 bg-background/20 backdrop-blur-sm rounded-md text-sm hover:bg-accent  z-20 pointer-events-auto "
              >
                <UploadIcon className="sm:mr-2 mr-2 h-4 w-4 " />
                Upload
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden "
                accept=".jpg,.jpeg,.png"
                onChange={uploadImage}
              />
              <div className=" z-20 pointer-events-auto flex gap-3 absolute top-0 p-5 ">
              <Switch
             
             checked={isChecked}
              onCheckedChange={(e)=>{
                setIsChecked(e)
                localStorage.setItem('mode-4',`${e}`)
                console.log("mode-4:", e)
              }} />
              <p className=" text-primary">GPT-4</p>
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
                      placeholder="Quantity/Weight"
                      value={items.quantity}
                      name="quantity"
                      onChange={onChangeInput}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className=" flex sm:gap-1  sm:items-end  sm:flex-col sm:max-w-[80px] flex-row-reverse justify-between w-full  ">
                    <Dropdown text="Preference" />
                    <Button
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
                        "messages2",
                        '[{ "role": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'
                      );
                      PostMessage(JSON.parse(localStorage.getItem("messages2") || ""))
                      setMessages(
                        JSON.parse(localStorage.getItem("messages2") || "")
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
                  className="px-10 w-full gap-2"
                  onClick={() => {
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

                         
                            setMessages([
                              ...messages,
                              {
                                products: [...messages[messages.length - 1].products],
                                message: `Your request for cancellation of menu has been successfully implemented!`,
                                direction: "outgoing",
                                role: "assistant",
                                image: "",
                              },
                            ])
                            
                            PostMessage([
                              ...messages,
                              {
                                products: [...messages[messages.length - 1].products],
                                message: `Your request for cancellation of menu has been successfully implemented!`,
                                direction: "outgoing",
                                role: "assistant",
                                image: "",
                              },
                            ])
                        
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

                            
                              setMessages([
                                ...messages,
                                {
                                  products: [...messages[messages.length - 1].products],
                                  message: `Hello, dear! Like a diligent spider , your menus are spun. Thanks for your patience, as precious as dew on a web. Enjoy your menus!
            
                                  Here are your menus:
                                  ${menus_name.join(" \n")} \n`,
                                  direction: "outgoing",
                                  role: "assistant",
                                  image: "",
                                },
                              ])
                              PostMessage([
                                ...messages,
                                {
                                  products: [...messages[messages.length - 1].products],
                                  message: `Hello, dear! Like a diligent spider , your menus are spun. Thanks for your patience, as precious as dew on a web. Enjoy your menus!
            
                                  Here are your menus:
                                  ${menus_name.join(" \n")} \n`,
                                  direction: "outgoing",
                                  role: "assistant",
                                  image: "",
                                },
                              ])
                           
                          }
                        }
                      })
                      .catch((error: any) => {
                        SetLoading(false);
                        console.log(error);
                      });
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

export default MainPage;
