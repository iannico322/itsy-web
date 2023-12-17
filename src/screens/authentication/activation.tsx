import { useState } from 'react';
import axios from  './../../plugins/axios';
import { useNavigate, useParams }  from 'react-router-dom';
import AlertBox from '@/components/alert/alert';


const Activation = () => {

  const navigate = useNavigate()
  const data = useParams()

  const [ok,setok]=useState(false)

  const [warning,setWarning]=useState({
    load:false,
    type:"",
    title:"",
    message:""
  })


  
  
  

  
  return (
    <div className='w-screen h-screen'>
      <div className=' h-[80%] bg-green-400 sm:h-full flex  w-full items-center  justify-center '>

        <div className='text-gray-100  w-[60%] flex items-center flex-col gap-3 sm:w-[90%] '>
          <h1 className='text-[40px] font-normal sm:text-[30px] '>ITSY</h1>

          <hr className=' borde-b-[.4px] border-[#e8e8e8] w-[40%] my-4 min-w-[500px] sm:min-w-[200px] sm:my-2'  />

          <p className='text-[60px] font-semibold sm:text-[40px] text-center '>{ok?"Successfully Activated ":"You're Almost There!"}</p>

          <p className='text-[18px] text-center sm:text-[16px]   '>{
          ok?" Sign in now ":"Just one more step to get started"}</p>





          <button 
          
          style={{display:ok?" none":"flex"}}
          
          className='px-10 py-3 text-lg font-semibold bg-gray-800 rounded-lg active:bg-opacity-75 sm:text-lg hover:bg-opacity-90 mt-9 '
          
          
          onClick={()=>{
         
              setWarning({
                load:true,
                type:"",
                title:"",
                message:""
              })
              
                axios
                .post("users/activation/", data)
                .then((response) => {
                  console.table(response)
                  setWarning({
                    load:true,
                    type:"success",
                    title:"Account activated",
                    message:"Great! Your account is succesfully activated"
                  })
                  

                  setok(true)
                }).catch(response=>{
                  

                  try {

                    setWarning({
                        load:true,
                        type:"error",
                        title:"Activation Failed",
                        message:JSON.parse(response.request.response).uid[0]
                      })
                    
                  } catch (e) {
                    
                  }

                  try {
                    setWarning({
                        load:true,
                        type:"error",
                        title:"Activation Failed",
                        message:JSON.parse(response.request.response).detail
                      })
                   
                  } catch (e) {
                    
                  }
                  

                })

              
              setTimeout(() => {
                setWarning({
                    load:false,
                    type:"",
                    title:"",
                    message:""
                  })
              }, 4000);
            }
          


          }
          
          
          >{ warning.load?"Activating...":"Activate Account"}</button>
          <div className={warning.load?"flex":"hidden"}>
            <AlertBox variant={warning.type}
            title={warning.title}
            description={warning.message}
            />

          </div>
            <button 
          className='px-10 py-3 text-lg font-semibold bg-gray-800 rounded-lg active:bg-opacity-75 sm:text-lg hover:bg-opacity-90 mt-9 '
          
          style={{display:ok?"flex ":"none"}}
          onClick={()=>{
            navigate('/itsy-web/itsy')
         
          }


          }
          
          
          >Go Sign In</button>
        
        </div>

      </div>


    </div>
  )
}

export default Activation