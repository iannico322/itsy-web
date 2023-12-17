import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from '../../plugins/axios'
import AlertBox from "@/components/alert/alert";
import { useParams,Link }  from 'react-router-dom';

const ResetPassword = () => {
  const key = useParams()
    const [warning,setWarning]=useState({
        load:false,
        type:"",
        title:"",
        message:""
      })

      const [userCreate, setUserCreate] = useState({
        ...key,
        new_password: "",
        re_new_password: "",
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
          setPasswordVal(validatePassword(userCreate.new_password))
        },[userCreate.new_password])
      
        useEffect(()=>{
          if (userCreate.new_password == userCreate.re_new_password && userCreate.new_password !="" && userCreate.re_new_password!="") {
            setConfirmPasswordVal(true)
          }else{
            setConfirmPasswordVal(false)
          }
        },[userCreate.new_password,userCreate.re_new_password])
       //Password validation family
  
      
       const [show,setShow] = useState(false)
       async function SignUp(){

        if (passwordVal && confirmpasswordVal) {
          setWarning({
            load:true,
            type:"",
            title:"",
            message:""
          })
          try {
            await axios.post("users/reset_password_confirm/", userCreate).then((res:any)=>{
              console.log(res.status)
              setWarning({
                load:true,
                type: "success",
                title: "Congratulations, Password has updated!",
                message: "Hooray! Your account password has been successfully updated."
              })
              setTimeout(() => {
                setWarning({
                  load:false,
                  type:"",
                  title:"",
                  message:""
                })
    
                setUserCreate({
                  ...key,
                  new_password: "",
                  re_new_password: "",
                })

                setShow(true)
              }, 3000);
              
              
    
            })
            
          } catch (error) {
            setWarning({
              load:true,
              type:"error",
              title: "Password Rest Unsuccessful",
              message:"Oops! There might be a problem."
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

     
      
  return (
    <div className=" h-screen  w-screen flex items-center justify-center bg-black/10 flex-col gap-4 ">
      
    {/* SignIn */}
    <div className=" sm:min-w-[90%] min-w-[500px] min-h-[200px] pb-12  max-w-[500px]  max-h-[700px] bg-card/90 border-border border-[1px] backdrop-blur-md rounded-md p-6 flex flex-col items-center animate__animated animate__fadeInUp ">
      
      <h1 className=" text-3xl font-semibold ml-10 sm:ml-4 flex self-start text-accent-foreground">
        Sign In
      </h1>
      <form onSubmit={(e:any)=>{
        e.preventDefault();
        }} className="  flex flex-col gap-4 mt-8 w-[80%] sm:w-[90%]">
       <div>
            <Input
            type="password"
            placeholder="New password"
            value={userCreate.new_password}
            name="new_password"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />
          <p className={passwordVal?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500"}>{passwordVal?"Valid password":"It must be at least 8 characters and include numbers."}</p>
          </div>
          
          <div>
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={userCreate.re_new_password}
            name="re_new_password"
            onChange={onChangeInputCreate}
            onKeyDown={handleKeyDown}
          />
          <p className={confirmpasswordVal?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500"}>{confirmpasswordVal?"Password match":"Password not match"}</p>
          </div>
       
        <Button
          variant="secondary"
          className={warning.load?"px-10 sm:w-full flex gap-3 pointer-events-none ":"px-10 sm:w-full flex gap-3"}
          onClick={SignUp}
        >
          Update Password
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

    <Button className={show?"flex":"hidden"}>
    <Link id="step1" to="/itsy-web/itsy">
    Sign In
        </Link>
 
    </Button>

    
  </div>
  )
}

export default ResetPassword