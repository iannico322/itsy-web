import{u as K,r as l,j as e,L as $}from"./index-962c5685.js";import{L as V,M as B}from"./mode-toggle-7e920b98.js";import{C as O,I as u,R as E,T as W,L as Q,a as X,b as Z,S as ee,U as te,c as se,A as ae,d as oe,E as ne,D as le,e as re,f as ie,t as m,g as ce,O as de,h as me,M as ue,i as pe}from"./switch-6619b2c9.js";import{B as p}from"./button-9731dd3e.js";import{a as T}from"./axios-0a52c127.js";import{A as q}from"./alert-19cc1381.js";import{k as fe}from"./driver-5a68f52b.js";import"./utils-c34355c1.js";const ge=({viewopt:P})=>{const b=K(),[g,j]=l.useState(0),L=a=>{N({...h,[a.target.name]:a.target.value})},x=a=>{S({...r,[a.target.name]:a.target.value})},c=a=>{a.key==="Enter"&&console.log("Enter key pressed")},[t,o]=l.useState({load:!1,type:"",title:"",message:""});function d(a){j(a)}const[h,N]=l.useState({email:"",password:""});async function A(){o({load:!0,type:"",title:"",message:""});try{await T.post("token/login/",h).then(a=>{localStorage.setItem("key",a.data.auth_token),o({load:!0,type:"success",title:"Login Successful",message:"You have successfully logged in. Please wait for a while..."}),T.get("users/me/",{headers:{Authorization:`Token ${a.data.auth_token}`}}).then(C=>{console.log(C.data),localStorage.setItem("user",JSON.stringify(C.data)),o({load:!0,type:"success",title:"Login Successful",message:`You have successfully logged in. Welcome back ${C.data.first_name} !`}),N({email:"",password:""}),b("/itsy-web/main")})})}catch{o({load:!0,type:"error",title:"Login Failed",message:" Please check your email, password, and ensure your account is activated."})}setTimeout(()=>{o({load:!1,type:"",title:"",message:""})},3e3)}const[r,S]=l.useState({first_name:"",last_name:"",email:"",password:"",re_password:""}),[I,U]=l.useState(!1),[k,y]=l.useState(!1),M=a=>!(a.length<8||!/\d/.test(a));l.useEffect(()=>{U(M(r.password))},[r.password]),l.useEffect(()=>{r.password==r.re_password&&r.password!=""&&r.re_password!=""?y(!0):y(!1)},[r.password,r.re_password]);async function D(){if(I&&k){o({load:!0,type:"",title:"",message:""});try{await T.post("users/",r).then(a=>{console.log(a.status),o({load:!0,type:"success",title:"Congratulations, Account Successfully Created!",message:"Hooray! Your account has been successfully created. Please check your email for the activation link to get started."}),setTimeout(()=>{o({load:!1,type:"",title:"",message:""}),S({first_name:"",last_name:"",email:"",password:"",re_password:""})},3e3)})}catch{o({load:!0,type:"error",title:"Account Creation Unsuccessful",message:"Oops! It seems the email address you entered may already be registered. Please check if your account is activated or try using the 'Forgot Password' option."}),setTimeout(()=>{o({load:!1,type:"",title:"",message:""})},6e3)}}}const[f,w]=l.useState({email:""});async function R(){o({load:!1,type:"",title:"",message:""}),console.table(f);try{await T.post("users/reset_password/",{email:f}).then(a=>{console.log(a.status),o({load:!0,type:"success",title:"Reset Link Sent Successfully!",message:"Great! A reset link has been sent to your email address. Please check your email inbox."}),setTimeout(()=>{o({load:!1,type:"",title:"",message:""})},3e3),w({email:""})})}catch{o({load:!0,type:"error",title:"Reset Link Sending Failed",message:"Oops! We couldn't send a reset link to your email address. Please ensure your email address is correct and try again."}),setTimeout(()=>{o({load:!1,type:"",title:"",message:""})},6e3)}}return e.jsxs("div",{className:" flex gap-10 ",children:[e.jsxs("div",{className:g==0?" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-6 flex flex-col items-center animate__animated animate__fadeInUp ":"hidden",children:[e.jsxs("div",{className:" w-full flex justify-between text-accent-foreground h-10 items-center",children:[e.jsx("h1",{className:" text-3xl font-semibold ml-10"}),e.jsx(O,{className:"sm:mr-0 mr-2 h-4 w-4 cursor-pointer text-accent-foreground  mb-5  ",onClick:P})]}),e.jsx("h1",{className:" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground",children:"Sign In"}),e.jsxs("form",{onSubmit:a=>{a.preventDefault(),A()},className:"  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]",children:[e.jsx(u,{type:"email",placeholder:"Email",value:h.email,name:"email",onChange:L,onKeyDown:c}),e.jsx(u,{type:"password",placeholder:"Password",value:h.password,name:"password",onChange:L,onKeyDown:c}),e.jsxs("p",{className:" font-normal text-sm hover:underline cursor-pointer text-accent-foreground ml-2",onClick:()=>{d(2)},children:["Forgot password?"," "]}),e.jsxs(p,{variant:"secondary",className:t.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3",children:["Sign In",e.jsx(E,{className:t.load?" h-4 w-4 animate-spin":"hidden"})]}),e.jsx("div",{className:t.load?"flex":"hidden",children:e.jsx(q,{variant:t.type,title:t.title,description:t.message})}),e.jsx("hr",{className:" border-border border-[1px] my-5"}),e.jsxs("p",{className:" text-accent-foreground text-sm text-center ",children:["Don't have an account?"," ",e.jsx("span",{className:" font-semibold hover:underline cursor-pointer ",onClick:()=>{d(1)},children:"Create a new one"})," "]})]})]}),e.jsxs("div",{className:g==1?" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-4 flex flex-col items-center animate__animated animate__fadeInUp ":"hidden",children:[e.jsxs("div",{className:" w-full flex justify-between text-accent-foreground h-10 items-center",children:[e.jsx("h1",{className:" text-3xl font-semibold ml-10"}),e.jsx(O,{className:"sm:mr-0 mr-2 h-4 w-4 cursor-pointer text-accent-foreground  mb-5  ",onClick:P})]}),e.jsx("h1",{className:" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground",children:"Sign Up"}),e.jsxs("form",{onSubmit:a=>{a.preventDefault(),D()},className:"  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]",children:[e.jsxs("div",{className:" flex gap-2",children:[e.jsx(u,{type:"text",placeholder:"First Name",value:r.first_name,name:"first_name",onChange:x,onKeyDown:c}),e.jsx(u,{type:"text",placeholder:"Last Name",value:r.last_name,name:"last_name",onChange:x,onKeyDown:c})]}),e.jsx(u,{type:"email",placeholder:"Email",value:r.email,name:"email",onChange:x,onKeyDown:c}),e.jsxs("div",{children:[e.jsx(u,{type:"password",placeholder:"Password",value:r.password,name:"password",onChange:x,onKeyDown:c}),e.jsx("p",{className:I?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500",children:I?"Valid password":"Invalid password"})]}),e.jsxs("div",{children:[e.jsx(u,{type:"password",placeholder:"Confirm Password",value:r.re_password,name:"re_password",onChange:x,onKeyDown:c}),e.jsx("p",{className:k?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500",children:k?"Password match":"Password not match"})]}),e.jsxs(p,{variant:"secondary",className:t.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3",children:["Sign Up",e.jsx(E,{className:t.load?" h-4 w-4 animate-spin":"hidden"})]}),e.jsx("div",{className:t.load?"flex":"hidden",children:e.jsx(q,{variant:t.type,title:t.title,description:t.message})}),e.jsx("hr",{className:" border-border border-[1px] my-5"}),e.jsxs("p",{className:" text-accent-foreground text-sm text-center",children:["Already have an Account?"," ",e.jsx("span",{className:" font-semibold hover:underline cursor-pointer ",onClick:()=>{j(0)},children:"Sign In now"})," "]})]})]}),e.jsxs("div",{className:g==2?" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-4 flex flex-col items-center animate__animated animate__fadeInUp ":"hidden",children:[e.jsxs("div",{className:" w-full flex justify-between text-accent-foreground h-10 items-center",children:[e.jsx("h1",{className:" text-3xl font-semibold ml-10"}),e.jsx(O,{className:"sm:mr-0 mr-2 h-4 w-4 cursor-pointer text-accent-foreground  mb-5  ",onClick:()=>{j(0)}})]}),e.jsx("h1",{className:" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground",children:"Forgot Password"}),e.jsxs("form",{onSubmit:a=>{a.preventDefault(),R()},className:"  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]",children:[e.jsx(u,{type:"email",placeholder:"Email",value:f.email,name:"email",onChange:a=>{w(a.target.value)},onKeyDown:c}),e.jsxs(p,{variant:"secondary",className:t.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3",children:["Send Reset Link",e.jsx(E,{className:t.load?" h-4 w-4 animate-spin":"hidden"})]}),e.jsx("div",{className:t.load?"flex":"hidden",children:e.jsx(q,{variant:t.type,title:t.title,description:t.message})})]})]})]})},Se=()=>{const P=K(),[b,g]=l.useState(0),[j,L]=l.useState("");l.useEffect(()=>{let s=window.matchMedia("only screen and (max-width: 760px)").matches;L(s?"#menus2":"#card-right-container")},[]);const x=fe({showProgress:!0,showButtons:["next","previous"],steps:[{element:"#step1",popover:{title:"👋 Hiya! Welcome to Itsy!",description:"This is Itsy's guest account. Ready to see some magic? 🎩✨",side:"left",align:"start"}},{element:"#card-left",popover:{title:"🗨️ Itsy Chit-Chat",description:"This is our little chit-chat corner. Just tell me your food items, and I'll whip up a dish you'll surely love! 🍽️❤️",side:"left",align:"start"}},{element:"#upload",popover:{title:"🔍 Magic Food Scanner",description:"Tap this magical button and poof! 🎩✨ I can identify your food, whether it's handwritten, a list, or a group of food. Give it a whirl! 🍲💫",side:"left",align:"start"}},{element:"#input-container",popover:{title:"📝 Manual Food Entry",description:"Oops! If I missed any of your foods, just tap here and fill in the blanks. Remember, a number for quantity and a cute label would be perfect! 🍎5️⃣ Give it a try!",side:"left",align:"start"}},{element:"#addItem",popover:{title:"🍽️ Add Food Now",description:"All set? Tap this button to add your food item to your list. Bon appétit! 🎉",side:"left",align:"start"}},{element:"#generate",popover:{title:"🍽️ Itsy's Kitchen Time",description:"Got your food items ready? Tap this magical button and I'll whip up some yummy dishes for you! Just a heads up, it might take a little while. 🎩✨",side:"left",align:"start"}},{element:j,popover:{title:"🍽️ Yummy Menus Corner",description:"This is where the magic happens! I'll display the scrumptious dishes I've whipped up for you right here. 🎩✨🍲 ",side:"left",align:"start"}},{element:"#language",popover:{title:"🌍 Language Switch",description:"Guess what? I can speak different languages! Well, at least for the food menus. Give it a try later! 🎩✨",side:"left",align:"start"}},{element:"#pref",popover:{title:"🍽️ Your Flavor Adventure",description:"Ready for a flavor adventure? Pick your food preferences here! Just a tiny note, choices are a smidge limited right now. 🎉",side:"left",align:"start"}},{element:"#account",popover:{title:"👤 Create Account or Sign In",description:"Hi! An account is crucial for full access. Without it, your usage is limited. After signing up, activate your account via the Gmail link Itsy sends. 🚀📧",side:"left",align:"start"}}]});l.useEffect(()=>{const s=new Date().toDateString(),n=localStorage.getItem("date"),i=localStorage.getItem("callCount");n===null||n!==s?(localStorage.setItem("date",s),localStorage.setItem("callCount","0"),g(0)):g(parseInt(i||"0")),(localStorage.getItem("key")!="0"||localStorage.getItem("user")!="0")&&P("/itsy-web/main"),localStorage.getItem("demo")=="1"&&x.drive()},[]);const c=s=>{if(b<10){const n=b+s;localStorage.setItem("callCount",n.toString()),g(n)}else console.log("No more function available.")},[t,o]=l.useState(JSON.parse(localStorage.getItem("messages")||"")),[d,h]=l.useState({name:"",quantity:""}),[N,A]=l.useState(!0),[r,S]=l.useState(JSON.parse(localStorage.getItem("menus")||"")),[I,U]=l.useState({name:"",ingredients:[],cooking_steps:[]}),[k,y]=l.useState(!1),[M,D]=l.useState(!1),[f,w]=l.useState(!1),[R,a]=l.useState(localStorage.getItem("mode-4")==="true");l.useEffect(()=>{document.querySelector("#bottom-scroll").scrollIntoView(!1),console.log(t),localStorage.setItem("messages",JSON.stringify(t))},[t]),l.useEffect(()=>{console.log(r),localStorage.setItem("menus",JSON.stringify(r))},[r]);function C(s,n){console.log(s,n);let i=t[s].products.filter((v,_)=>_!==n);o([...t,{products:i,message:"This is my updated Item",direction:"outgoing",role:"user",image:""}])}function z(){o([...t,{products:[...t[t.length-1].products],message:`🕸️Hello, dear! Like a diligent spider 🕷️, I’m spinning your menus. Your patience is as precious as dew on a web. I’m fetching your menus! 🌼

          Please wait while I’m searching for your menus…`,direction:"outgoing",role:"assistant",image:"loading"}])}function F(){if(d.name==""||d.quantity=="")m({title:"Oopsie My Dear!",description:"Hold on, sweetie! Make sure all the little boxes are filled."});else{let s=document.querySelector(".driver-popover-next-btn");s==null||s.click(),console.log({name:d.name,quantity:d.quantity}),o([...t,{products:t[t.length-1].products.concat([{name:d.name,quantity:d.quantity}]),message:"This is my updated Item",direction:"outgoing",role:"user",image:""}]),h({name:"",quantity:"1"})}}const H=s=>{let n=document.querySelector(".driver-popover-next-btn");n==null||n.click(),c(0),b>9?m({title:"ITSY whoopsyyy!",description:"You have reach your usage limit today, please comeback tommorow or register an account for unlimited usage."}):(m({title:"Analyzing Image...",description:"Please hold on, I’m analyzing your image…...!"}),o([...t,{products:[...t[t.length-1].products],message:"Could you please identify the food items in this image?",direction:"outgoing",role:"user",image:URL.createObjectURL(s.target.files[0])},{products:[...t[t.length-1].products],message:"🕸️Greetings! I’m currently processing your image. Please hold on for a moment…",direction:"outgoing",role:"assistant",image:"loading"}]),pe({image:s.target.files[0]}).then(i=>{console.log("Scan Result:"),console.table(i),i[0].warning?o([...t,{products:[...t[t.length-1].products],message:"Could you please identify the food items in this image?",direction:"outgoing",role:"user",image:URL.createObjectURL(s.target.files[0])},{products:[...t[t.length-1].products],message:"🕸️Hello, I’ve finished scanning your items. Unfortunately, no food items were detected. Thank you for your patience",direction:"outgoing",role:"assistant",image:""}]):o([...t,{products:[...t[t.length-1].products],message:"Could you please identify the food items in this image?",direction:"outgoing",role:"user",image:URL.createObjectURL(s.target.files[0])},{products:[...t[t.length-1].products,...i],message:"🕸️Hello, I’ve finished scanning your items. Thank you for your patience",direction:"outgoing",role:"assistant",image:""},{products:[...t[t.length-1].products,...i],message:"Could you please identify the food items in this image?",direction:"outgoing",role:"user",image:""}]),m({title:"Done",description:"Hello, I’ve finished scanning your items!"}),c(1)}))},Y=s=>{s.key==="Enter"&&(console.log("Enter key pressed"),F())},G=s=>{h({...d,[s.target.name]:s.target.value})};return e.jsxs("div",{className:" flex flex-col  w-screen h-screen overflow-hidden  bg-background box-border ",children:[e.jsx("div",{className:M?"   overflow-hidden flex w-screen h-screen absolute z-50 bg-black/70  items-center justify-center ":"hidden",children:e.jsx(ge,{viewopt:()=>{D(!1)}})}),e.jsx("div",{className:"  w-full h-full absolute bottom-0 z-20 pointer-events-none overflow-hidden",children:e.jsx(W,{})}),e.jsxs("nav",{className:" flex justify-between items-center w-full py-5 box-border px-6  ",children:[e.jsx($,{className:" w-[20%] min-w-[100px] ",to:"/itsy-web",children:e.jsx("img",{id:"step1",className:"object-contain h-12 m-0 sm:h-8  ",src:V,alt:"ITSY logo"})}),e.jsxs("div",{className:"flex gap-3 w-[50%]  md:w-[75%] sm:gap-1 justify-end items-center",children:[e.jsx(p,{id:"account",variant:"default",className:"px-5 sm:w-full flex sm:text-xs   ",onClick:()=>{let s=document.querySelector(".driver-popover-next-btn");s==null||s.click(),D(!0)},children:"Use My Account"}),e.jsx(Q,{id:"language"}),e.jsx(B,{})]})]}),e.jsxs("div",{id:"menus",className:" hidden sm:flex w-full h-10 items-center z-30   gap-3 justify-center text-accent-foreground/80 text-xs ",children:[e.jsxs("p",{className:" flex gap-2 items-center hover:text-[#3dd44b] hover:cursor-pointer  ",onClick:()=>{A(!0),y(!1)},children:[" ",e.jsx(X,{className:"sm:mr-0 mr-2 h-4 w-4 "})," Chat"]}),"|",e.jsxs("p",{id:"menus2",className:" relative flex gap-2 items-center hover:text-[#3dd44b] hover:cursor-pointer ",onClick:()=>{A(!1),y(!1)},children:[" ","Menus ",e.jsx(Z,{className:"sm:mr-0 mr-2 h-4 w-4 "}),e.jsx("span",{className:r.length==0?" pointer-events-none text-[10px] translate-y-[-8px] translate-x-2 absolute right-0 h-4 w-4 bg-red-500  text-accent hidden items-center justify-center rounded-full":" pointer-events-none text-[10px] translate-y-[-8px] translate-x-2 absolute right-0 h-4 w-4 bg-red-500  text-accent flex items-center justify-center rounded-full ",children:r.length})]})]}),e.jsxs("div",{id:"container",className:" relative h-full w-full flex px-6 sm:pb-0 gap-5 box-border justify-center  items-center pb-6 overflow-hidden sm:flex-col   ",children:[e.jsxs("div",{className:k?" absolute h-[97.2%] w-full flex px-6 sm:pb-0 gap-5 box-border justify-center  items-center  overflow-hidden sm:flex-col pointer-events-none ":" hidden absolute h-full w-full px-6 sm:pb-0 gap-5 box-border justify-center  items-center  overflow-hidden sm:flex-col pointer-events-none ",children:[e.jsx("div",{className:" relative sm:absolute z-30 sm:h-[95%] sm:w-[97%] flex bg-card border-border border-[1px] rounded-md w-[70%] h-full flex-col  box-border  items-center justify-center pointer-events-auto p-5",children:e.jsx(ee,{SelectedMenu:I,back:()=>{y(!1)}})}),e.jsx("div",{className:" sm:hidden relative  w-[30%] h-full  pointer-events-none"})]}),e.jsxs("div",{id:"card-left",className:N?" sm:absolute sm:h-[95%] sm:w-[97%] relative bg-card border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center":" sm:absolute sm:h-[95%] sm:w-[97%] relative bg-card sm:hidden border-border border-[1px] rounded-md w-[70%] h-full   box-border  flex items-center justify-center",children:[e.jsxs("div",{id:"uploading-image-layer-1",className:" w-[95%] h-[95%] rounded-md flex flex-col box-border  absolute z-100 pointer-events-none ",children:[e.jsxs("div",{className:" relative h-full w-full  gap-5   flex items-end justify-end  ",children:[e.jsx("div",{className:"  absolute  z-20 pointer-events-none flex gap-3  left-0 bottom-0 p-5 ",children:e.jsxs("p",{className:" animate__animated animate__fadeInLeft animate__delay-1s  text-accent-foreground sm:text-xs ",children:["Usage: ",e.jsx("span",{className:" text-primary text-xl",children:localStorage.getItem("callCount")}),"/10"]})}),e.jsxs("label",{id:"upload",htmlFor:"file-upload",className:" animate__animated animate__fadeInUp animate__delay-2s  border-[1px] border-border flex items-center justify-center   px-3 py-2 w-30 cursor-pointer text-accent-foreground sm:m-3 m-7 bg-background/20 backdrop-blur-sm rounded-md text-sm hover:bg-accent  z-20 pointer-events-auto sm:text-xs ",children:[e.jsx(te,{className:"sm:mr-2 mr-2 sm:h-[14px] sm:w-[14px]  h-4 w-4 "}),"Upload"]}),e.jsx("input",{id:"file-upload",type:"file",className:"hidden ",accept:".jpg,.jpeg,.png",onChange:H}),e.jsxs("div",{className:"  z-20 pointer-events-auto flex gap-3 items-center  absolute top-0 p-5 sm:p-2 ",children:[e.jsx(se,{checked:R,onCheckedChange:s=>{a(s),localStorage.setItem("mode-4",`${s}`),console.log("mode-4:",s)}}),e.jsx("p",{className:" text-primary sm:text-sm text-center",children:"GPT-4"})]})]}),e.jsx("div",{className:" sm:pt-7 flex w-full h-[200px] pt-8 flex-col  justify-between  "})]}),e.jsxs("div",{id:"card-left-container-layer-2",className:" w-[95%] h-[95%] rounded-md flex flex-col box-border  ",children:[e.jsx("div",{id:"chat-part",className:" w-full h-full overflow-y-scroll relative border-[#48df48]  border-[1px] rounded-md",children:e.jsx("div",{className:" relative min-h-[400px] w-full flex flex-col gap-5 items-center py-5 pb-16 sm:pb-11   ",id:"bottom-scroll",children:t.length>=2?t.map((s,n)=>s.role!="user"?e.jsx(ae,{e:s},n):e.jsx(oe,{e:s,mkey:n,onDelete:C},n)):e.jsx(ne,{})})}),e.jsxs("div",{id:"action-part-container",className:" sm:pt-7   flex w-full h-[200px] pt-8 flex-col  justify-between ",children:[e.jsx("div",{id:"whole-action-container",className:"flex justify-around w-full h-16 items-end ",children:e.jsxs("div",{id:"input-and-button-container-not-preference",className:" sm:gap-4 flex items-end w-full h-full gap-8  ",children:[e.jsxs("div",{id:"input-container",className:"  flex gap-4 w-full max-w-[1020px]",children:[e.jsx(u,{type:"text",placeholder:"Name",value:d.name,name:"name",onChange:G,onKeyDown:Y}),e.jsx(u,{type:"text",placeholder:"Quantity/Weight",value:d.quantity,name:"quantity",onChange:G,onKeyDown:Y})]}),e.jsxs("div",{className:" flex sm:gap-1  sm:items-end  sm:flex-col sm:max-w-[80px] flex-row-reverse justify-between w-full  ",children:[e.jsx(le,{text:"Preference",id:"pref"}),e.jsxs(p,{id:"addItem",variant:"default",className:"px-10 sm:w-full flex ",onClick:F,children:["Add ",e.jsx("span",{className:"sm:hidden",children:"-Items"})]})]})]})}),e.jsxs(p,{variant:"outline",className:f?" animate__animated animate__fadeInUp min-w-24 text-accent-foreground  absolute  flex self-center  gap-2  mt-[40px] ":" min-w-24 text-accent-foreground  absolute   self-center  gap-2  translate-y-[40px] animate-pulse hidden ",onClick:()=>{re()},children:[e.jsx(ie,{className:"sm:mr-0 mr-2 h-4 w-4 text-accent-foreground animate-spin  "}),"Stop Responding"]}),e.jsxs("div",{className:"flex w-full flex-row gap-4 relative",children:[e.jsxs(p,{variant:"outline",className:" w-24 text-accent-foreground sm:w-14",onClick:()=>{window.confirm("Sure to erase? No magic can bring it back!")?(localStorage.setItem("messages",`[{ "role": "itsy", "products": [],"message":"Hey dear, I'm ITSY your culinary spider buddy! share your items, and I'll weave dishes so snappy!", "direction":"","image":"" }]`),o(JSON.parse(localStorage.getItem("messages")||"")),localStorage.setItem("menus","[]"),S(JSON.parse(localStorage.getItem("menus")||"")),m({title:"Poof! All Gone!",description:"Everything's been swept away, as clean as your messenger box!"})):m({title:"Erase Cancelled! ",description:"Oh, you decided to stick around... Let's keep making memories together!"})},children:[e.jsx(ce,{className:"sm:mr-0 mr-2 h-4 w-4 text-accent-foreground"}),e.jsx("span",{className:" sm:hidden",children:"Erase"})]}),e.jsxs(p,{disabled:!!f,id:"generate",className:"px-10 w-full gap-2",onClick:()=>{let s=document.querySelector(".driver-popover-next-btn");if(s==null||s.click(),c(0),b>9)m({title:"ITSY whoopsyyy!",description:"You have reach your usage limit today, please comeback tommorow or register an account for unlimited usage."});else{m({title:"Loading... ",description:"Please wait for i searching for your menus"});let n=[];t[t.length-1].products.map(i=>n=[...n,`${i.quantity} ${i.name}`]),console.log(n.join(" ")),z(),w(!0),de({product:`${n.join(",")}`}).then(i=>{if(console.log("Menu API Response"),console.table(i),i.length==0)m({title:"Stop Responding!",description:"Your request for cancellation of menu has been successfully implemented"}),w(!1),t.map(v=>o([...t,{products:[...v.products],message:"Your request for cancellation of menu has been successfully implemented!",direction:"outgoing",role:"assistant",image:""}]));else if(w(!1),S(i),m({title:"DONE... ",description:"Here are your menus"}),i){let v=[];i.map((_,J)=>{v=[...v,`${J+1}. ${_.name}`]}),t.map(_=>o([...t,{products:[..._.products],message:`🕸️Hello, dear! Like a diligent spider 🕷️, your menus are spun. Thanks for your patience, as precious as dew on a web. Enjoy your menus!
            
                                  Here are your menus:
                                  ${v.join(` 
`)} 
`,direction:"outgoing",role:"assistant",image:""}])),c(1)}}).catch(i=>{w(!1),console.log(i)})}},children:["Generate Menus",f?e.jsx(E,{className:"mr-2 h-4 w-4 animate-spin"}):e.jsx(me,{className:"mr-2 h-4 w-4 text-accent text-xl"})]})]})]})]})]}),e.jsxs("div",{id:"card-right-container",className:N?"sm:hidden sm:absolute sm:w-[97%] flex sm:h-[95%]  border-border bg-card    relative   border-[1px] rounded-md w-[30%] h-full  box-border p-5 flex-col sm:p-2  ":"sm:absolute sm:w-[97%] flex sm:h-[95%]  border-border bg-card    relative   border-[1px] rounded-md w-[30%] h-full  box-border p-5 flex-col sm:p-2  ",children:[e.jsxs("div",{className:" w-full min-h-[10px] pb-4 text-accent-foreground/90 flex items-center flex-col text-center",children:[e.jsx("p",{className:" text-lg font-bold",children:"Food You can cook"}),e.jsx("p",{className:" text-sm text-accent-foreground/70",children:"Click view to view recipe and cooking steps"})]}),e.jsx("div",{className:" h-full w-full border-[#3dd44b] border-[1px] rounded-md flex flex-col gap-4 py-5",children:f?e.jsx(ue,{}):r.length!=0?r.map((s,n)=>e.jsxs("div",{className:"flex w-full justify-between px-6 items-center",children:[e.jsxs("h1",{className:" text-sm  text-accent-foreground max-w-[60%] text-left",children:[" ",n+1,". ",s.name]}),e.jsx(p,{size:"sm",onClick:()=>{y(!0),U(s)},children:"View"})]},n)):""})]})]})]})};export{Se as default};