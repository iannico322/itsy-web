
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross1Icon,ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from '../../plugins/axios'
import AlertBox from "@/components/alert/alert";
import { useNavigate } from "react-router-dom";


const SinSupFo = ({ viewopt }: any) => {
  const navigate = useNavigate()
 


  const [sinsupfo,setSinSupFo] = useState(0)  

  const onChangeInput = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputCreate = (e: any) => {
    setUserCreate({
      ...userCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };


  const [warning,setWarning]=useState({
    load:false,
    type:"",
    title:"",
    message:""
  })

  function SinSupFoScreen(num:any){
    setSinSupFo(num)
  }
 



  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function SignIn(){
    setWarning({
      load:true,
      type:"",
      title:"",
      message:""
    })

    try {
     await axios.post("token/login/",user).then((res:any)=>{
        localStorage.setItem("key",res.data.auth_token)
        setWarning({
          load:true,
          type: "success",
          title: "Login Successful",
          message: "You have successfully logged in. Please wait for a while..."
        })
         axios.get("users/me/",{
          headers: {
            Authorization: `Token ${res.data.auth_token}`,
          }, 
        }).then((res:any)=>{
          console.log(res.data)
          localStorage.setItem("user",JSON.stringify(res.data))
          setWarning({
            load:true,
            type: "success",
            title: "Login Successful",
            message: `You have successfully logged in. Welcome back ${res.data.first_name} !`
          })


          setUser({
            email: "",
            password: "",
          })
          navigate('/itsy-web/main')
      })



    })
      
    } catch (error) {
        setWarning({
          load:true,
          type:"error",
          title:"Login Failed",
          message:" Please check your email, password, and ensure your account is activated."
        })
      
    }
    setTimeout(() => {
      setWarning({
        load:false,
        type:"",
        title:"",
        message:""
      })

    }, 3000);

    
    

  }


  const [userCreate, setUserCreate] = useState({
    first_name:"",
    last_name:"",
    email: "",
    password: "",
    re_password: "",
  });

  const [passwordVal,setPasswordVal]=useState(false)
  const [confirmpasswordVal,setConfirmPasswordVal]=useState(false)
    //Password validation family
    const validatePassword = (password: string) => {
      // Password should be at least 5 characters long
      if (password.length < 8) {
        return false;
      }
  
      // Password should contain at least one number
      if (!/\d/.test(password)) {
        return false;
      }
  
      return true;
    };
    useEffect(()=>{
      setPasswordVal(validatePassword(userCreate.password))
    },[userCreate.password])
  
    useEffect(()=>{
      if (userCreate.password == userCreate.re_password && userCreate.password !="" && userCreate.re_password!="") {
        setConfirmPasswordVal(true)
      }else{
        setConfirmPasswordVal(false)
      }
    },[userCreate.password,userCreate.re_password])
   //Password validation family

  async function SignUp(){

    if (passwordVal && confirmpasswordVal) {
      setWarning({
        load:true,
        type:"",
        title:"",
        message:""
      })
      try {
        await axios.post("users/",userCreate).then((res:any)=>{
          console.log(res.status)
          setWarning({
            load:true,
            type: "success",
            title: "Congratulations, Account Successfully Created!",
            message: "Hooray! Your account has been successfully created. Please check your email for the activation link to get started."
          })
          setTimeout(() => {
            setWarning({
              load:false,
              type:"",
              title:"",
              message:""
            })

            setUserCreate({
              first_name:"",
              last_name:"",
              email: "",
              password: "",
              re_password: "",
            })
          }, 3000);
          
          

        })
        
      } catch (error) {
        setWarning({
          load:true,
          type:"error",
          title: "Account Creation Unsuccessful",
          message:"Oops! It seems the email address you entered may already be registered. Please check if your account is activated or try using the 'Forgot Password' option."
        })
        setTimeout(() => {
          setWarning({
            load:false,
            type:"",
            title:"",
            message:""
          })
        }, 6000);
        
      }
    }
    
  }
  const [userF, setUserF] = useState({
    email: "",
  });
  async function ForgotPassword(){
  
    setWarning({
      load:false,
      type:"",
      title:"",
      message:""
    })

    console.table(userF)
    
      try {
        await axios.post("users/reset_password/",{"email":userF}).then((res:any)=>{
          console.log(res.status)
          setWarning({
            load:true,
            type: "success",
            title: "Reset Link Sent Successfully!",
            message: "Great! A reset link has been sent to your email address. Please check your email inbox."
          })
          setTimeout(() => {
            setWarning({
              load:false,
              type:"",
              title:"",
              message:""
            })
          }, 3000);
          setUserF({email:""})
        })
        
      } catch (error) {
        setWarning({
          load:true,
          type:"error",
          title: "Reset Link Sending Failed",
          message:"Oops! We couldn't send a reset link to your email address. Please ensure your email address is correct and try again."
        })
        setTimeout(() => {
          setWarning({
            load:false,
            type:"",
            title:"",
            message:""
          })
        }, 6000);
        
      
    }
    
  }

  return (
    <div className=" flex gap-10 ">
      
      {/* SignIn */}
      <div className={sinsupfo==0?" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-6 flex flex-col items-center animate__animated animate__fadeInUp ":"hidden"}>
        <div className=" w-full flex justify-between text-accent-foreground h-10 items-center">
          <h1 className=" text-3xl font-semibold ml-10"></h1>
          <Cross1Icon
            className="sm:mr-0 mr-2 h-4 w-4 cursor-pointer text-accent-foreground  mb-5  "
            onClick={viewopt}
          />
        </div>
        <h1 className=" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground">
          Sign In
        </h1>
        <form onSubmit={(e:any)=>{
          e.preventDefault();
          SignIn()}} className="  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]">
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
          />
          <p className=" font-normal text-sm hover:underline cursor-pointer text-accent-foreground ml-2"
          onClick={()=>{
            SinSupFoScreen(2)
          }}
          >
            Forgot password?{" "}
          </p>
          <Button
            variant="secondary"
            className={warning.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3"}
            
          >
            Sign In
            <ReloadIcon  className={warning.load?" h-4 w-4 animate-spin":"hidden"}/>
            
          </Button>
          <div className={warning.load?"flex":"hidden"}>
            <AlertBox variant={warning.type}
            title={warning.title}
            description={warning.message}
            />

          </div>
          
        
          <hr className=" border-border border-[1px] my-5" />
          <p className=" text-accent-foreground text-sm text-center ">
            Don't have an account?{" "}
            <span className=" font-semibold hover:underline cursor-pointer " 
            onClick={()=>{
              SinSupFoScreen(1)
            }}>
              Create a new one
            </span>{" "}
          </p>
        </form>
      
      </div>

       {/* SignUp */}
      <div className={sinsupfo==1?" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-4 flex flex-col items-center animate__animated animate__fadeInUp ":"hidden"}>
        <div className=" w-full flex justify-between text-accent-foreground h-10 items-center">
          <h1 className=" text-3xl font-semibold ml-10"></h1>
          <Cross1Icon
            className="sm:mr-0 mr-2 h-4 w-4 cursor-pointer text-accent-foreground  mb-5  "
            onClick={viewopt}
          />
        </div>
        <h1 className=" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground">
          Sign Up
        </h1>
        <form onSubmit={(e:any)=>{
          e.preventDefault();
          SignUp()}} className="  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]">
          <div className=" flex gap-2">
          <Input
            type="text"
            placeholder="First Name"
            value={userCreate.first_name}
            name="first_name"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={userCreate.last_name}
            name="last_name"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />

          </div>
          

          <Input
            type="email"
            placeholder="Email"
            value={userCreate.email}
            name="email"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />
          <div>
            <Input
            type="password"
            placeholder="Password"
            value={userCreate.password}
            name="password"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />
          <p className={passwordVal?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500"}>{passwordVal?"Valid password":"Invalid password"}</p>
          </div>
          
          <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={userCreate.re_password}
            name="re_password"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />
          <p className={confirmpasswordVal?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500"}>{confirmpasswordVal?"Password match":"Password not match"}</p>
          </div>
          
          <Button
            variant="secondary"
            className={warning.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3"}
            
          >
            Sign Up
            <ReloadIcon  className={warning.load?" h-4 w-4 animate-spin":"hidden"}/>
            
          </Button>
          <div className={warning.load?"flex":"hidden"}>
            <AlertBox variant={warning.type}
            title={warning.title}
            description={warning.message}
            />

          </div>
          <hr className=" border-border border-[1px] my-5" />
          <p className=" text-accent-foreground text-sm text-center">
            Already have an Account?{" "}
            <span className=" font-semibold hover:underline cursor-pointer " onClick={()=>{
              setSinSupFo(0)
            }}>
              Sign In now
            </span>{" "}
          </p>
        </form>
      
      </div>

      <div className={sinsupfo==2?" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-4 flex flex-col items-center animate__animated animate__fadeInUp ":"hidden"}>
        <div className=" w-full flex justify-between text-accent-foreground h-10 items-center">
          <h1 className=" text-3xl font-semibold ml-10"></h1>
          <Cross1Icon
            className="sm:mr-0 mr-2 h-4 w-4 cursor-pointer text-accent-foreground  mb-5  "
            onClick={()=>{
              setSinSupFo(0)
            }}
          />
        </div>
        <h1 className=" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground">
          Forgot Password
        </h1>
        <form onSubmit={(e)=>{
          e.preventDefault()
          ForgotPassword()
        }} className="  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]">
          <Input
            type="email"
            placeholder="Email"
            value={userF.email}
            name="email"
            onChange={(e:any)=>{
              setUserF(e.target.value)
            }}
            onKeyDown={handleKeyDown}
          />
         
         <Button
            variant="secondary"
            className={warning.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3"}
            
          >
            Send Reset Link
            <ReloadIcon  className={warning.load?" h-4 w-4 animate-spin":"hidden"}/>
            
          </Button>
          <div className={warning.load?"flex":"hidden"}>
            <AlertBox variant={warning.type}
            title={warning.title}
            description={warning.message}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SinSupFo;
