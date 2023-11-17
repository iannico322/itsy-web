import ItsyLogo from './../../../../images/Itsy_logo.png'
import './scanLoad.css'
function AIMSG({e}: any) {



  let formattedMessage = e.message.split('\n').map((line:any, index:any) => {
    return index === 0 ? line : [<br key={index} />, line];
  });
  
  return (
    <div className=" animate__animated animate__fadeInUp w-[100%] min-h-[15px]  flex items-center justify-start  py-3 ">
      <div className=" pr-5 pl-2 py-2 min-w-[10px] max-w-[60%] md:max-w-[90%] ml-5 text-sm text-accent-foreground/70 rounded-md bg-muted  border-[1px] ">
       

      {e.image ? <div className='flex w-full gap-2'>
            <img src={ItsyLogo} alt="Logo" className=' h-10 object-contain' />
            
            <div className=' flex flex-col gap-1'>
              <div className=' flex  items-center gap-2'>
                <p className=' text-[#3dd44b] text-xl font-bold md:text-base'>ITSY</p>
              <div className="loader"></div>
              </div>
              
              <p className=" text-sm sm:text-xs "  >{formattedMessage}</p>
            </div>
            
        </div>
        :
        ""    
    }    

        {e.message && e.image == "" ? <div className='flex w-full gap-2'>
            <img src={ItsyLogo} alt="Logo" className=' h-10 object-contain' />
            <div className=' flex flex-col gap-1'>
              <p className=' text-[#3dd44b] text-xl font-bold md:text-base'>ITSY</p>
              <p className=" text-sm sm:text-xs "  >{formattedMessage}</p>
            </div>
            
        </div>
        :
        ""    
    }    


    

        

      </div>
    </div>
  );
}

export default AIMSG;
