import { Link } from "react-router-dom";
import Logo from "./../../images/Itsy_logo_w_text.png";
import { Language } from "@/components/languange/language";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { EraserIcon } from "@radix-ui/react-icons";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { LayersIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import EmtScreen from "./EmtScreen";
import UserMSG from "./UserMSG";
import AIMSG from "./AIMSG";

const MainPage = () => {
  type MessageType = {
    from: string;
    products: any;
    direction: any;
    message: any;
    image: any;
  };

  const [messages, setMessages] = useState<MessageType[]>(
    JSON.parse(localStorage.getItem("messages") || "")
  );

  const [items, setItem]: any = useState({ name: "", qk: "" });
  const [pageAtChat, setpageAtChat] = useState(true);


//this auto save the messages of the users
  useEffect(() => {
    const element: any = document.querySelector("#bottom-scroll");
    element.scrollIntoView(false);
    console.log(messages);
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);




  // this function gets the value of the source and update it
  const onChangeInput = (e: any) => {
    setItem({
      ...items,
      [e.target.name]: e.target.value,
    });
  };

  function deleteItem(indexMain: any, indexToDelete: any) {
    messages[indexMain].products.splice(indexToDelete, 1);

    setMessages([...messages, messages[indexMain]]);

    console.log(messages[indexMain], "yawa", indexMain);
  }

  function reply() {
    messages.map((e: any) =>
      setMessages([
        ...messages,
        {
          products: [...e.products],
          message: "hi yawa",
          direction: "outgoing",
          from: "pc",
          image: "",
        },
      ])
    );

    setItem({ name: "", qk: "" });
  }

  function addItems() {
    if (items.name=="" || items.qk=="") {

      toast({
        title: "Oopsie My Dear!",
        description: "Hold on, sweetie! Make sure all the little boxes are filled.",
      });
      
    }else{
      messages.map((e) =>
      setMessages([
        ...messages,
        {
          products: [
            ...e.products,
            { itemsName: `${items.name}`, itemsQK: `${items.qk}` },
          ],
          message: "This is your updated Item",
          direction: "outgoing",
          from: "user",
          image: "",
        },
      ])
    );
    setItem({ name: "", qk: "1" });
    }
    
  }

  return (
    <div className=" flex flex-col  w-screen h-screen overflow-hidden  bg-background box-border ">
      {/* This is toaster in a simple words a pop up warning modal */}
      <div className="  w-full h-full absolute bottom-0 z-20 pointer-events-none overflow-hidden">
        <Toaster />
      </div>
      {/* This is toaster in a simple words a pop up warning modal */}

      {/* Naa dri ang navigation bar */}
      <nav className=" flex justify-around items-center w-full py-5 box-border px-6  ">
        <Link className=" w-[70%] sm:w-[50%]" to="/itsy-web">
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

      {/* Mobile Navigation only shows when screen is sm */}
      <div className=" hidden sm:flex w-full h-10 items-center   gap-3 justify-center text-accent-foreground/80 text-xs ">
        <p
          className=" flex gap-2 items-center hover:text-[#3dd44b] hover:cursor-pointer  "
          onClick={() => {
            setpageAtChat(true);
          }}
        >
          {" "}
          <ChatBubbleIcon className="sm:mr-0 mr-2 h-4 w-4 " /> Chat
        </p>
        |
        <p
          className=" flex gap-2 items-center hover:text-[#3dd44b] hover:cursor-pointer "
          onClick={() => {
            setpageAtChat(false);
          }}
        >
          {" "}
          Menus <LayersIcon className="sm:mr-0 mr-2 h-4 w-4 " />
        </p>
      </div>
      {/* Mobile Navigation only shows when screen is sm */}

      <div
        id="container"
        className=" relative h-full w-full flex px-6 sm:pb-0 gap-5 box-border justify-center  items-center pb-6 overflow-hidden sm:flex-col   "
      >
        {/* CARD 1 */}
        <div
          id="card-left"
          className={
            pageAtChat
              ? " sm:absolute sm:h-[95%] sm:w-[97%] relative bg-card border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center"
              : " sm:absolute sm:h-[95%] sm:w-[97%] relative bg-card sm:hidden border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center"
          }
        >
          <div
            id="card-left-container"
            className=" w-[95%] h-[95%] rounded-md flex flex-col  "
          >
            {/* This page is for chat on left container */}
            <div
              id="chat-part"
              className=" w-full h-full overflow-y-scroll relative border-[#48df48]  border-[1px] rounded-md"
            >
              <div
                className=" relative min-h-[400px] w-full flex flex-col gap-5 items-center py-5  "
                id="bottom-scroll"
              >
                {messages.length >= 2 ? (
                  messages.map((e, key) =>
                    e.from != "user" ? (
                      <AIMSG e={e} />
                    ) : (
                      <UserMSG e={e} mkey={key} onDelete={deleteItem} />
                    )
                  )
                ) : (
                  <EmtScreen />
                )}
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
                    />
                    <Input
                      type="text"
                      placeholder="Quantity/Weight"
                      value={items.qk}
                      name="qk"
                      onChange={onChangeInput}
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

              <div className="flex w-full flex-row gap-4">


                {/* this button clear the data in side the message storage */}
                <Button
                  variant="outline"
                  className=" w-24 text-accent-foreground sm:w-14"
                  onClick={() => {
                    if (window.confirm('Sure to erase? No magic can bring it back!')) {
                      localStorage.setItem(
                        "messages",
                        '[{ "from": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'
                      );
                      setMessages(
                        JSON.parse(localStorage.getItem("messages") || "")
                      );
                      toast({
                        title: "Poof! All Gone!",
                        description: "Everything's been swept away, as clean as your messenger box!",
                      });
                    } else {
                      toast({
                        title: "Erase Cancelled! ",
                        description: "Oh, you decided to stick around... Let's keep making memories together!",
                      });
                    }
                  }}
                >
                  <EraserIcon className="sm:mr-0 mr-2 h-4 w-4 text-accent-foreground" />
                  <span className=" sm:hidden">Erase</span>
                </Button>
                {/* this button clear the data in side the message storage */}




                <Button
                  className="px-10 w-full gap-2"
                  onClick={() => {
                    console.log("shit");
                    reply();
                    toast({
                      title: "Generating Menus ",
                      description: "Please wait yawa",
                    });
                  }}
                >
                  Generate Menus
                  <DiscordLogoIcon className="mr-2 h-4 w-4 text-accent text-xl" />
                </Button>
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
          <div className=" h-full w-full border-[#3dd44b] border-[1px] rounded-md"></div>
          {/* container of menus here */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
