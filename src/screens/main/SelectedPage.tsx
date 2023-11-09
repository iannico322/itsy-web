import { Button } from '@/components/ui/button'
import logo from './../../images/Itsy_logo.png'

const SelectedPage = (props:any) => {
  return (
    <>
      <div className=" relative h-[95%] sm:w-[95%]  border-[1px] border-[#3dd44b] rounded-md w-full overflow-y-scrol  ">
        <div className="absolute z-0 flex flex-col w-full h-full overflow-y-scroll ">
          <div className="w-full p-5 h-500px">
            <div className="flex flex-row justify-between min-h-[100px] items-center h-[100px] w-full text-accent-foreground  ">
              <div className="flex justify-between w-full items-center " >
                <div className='flex gap-4  '>
                    <img src={logo} className=" animate__animated animate__fadeInDown h-[70px] sm:h-[50px] object-contain  relative" />
                    <div className="flex flex-col items-start justify-center">
                    <p className="text-lg font-bold sm:text-sm text-[#3dd44b]">ITSY</p>
                    <p className="text-xl font-bold sm:text-base ">👨‍🍳{ props.SelectedMenu.name ? props.SelectedMenu.name:"" }</p>
                    <p className=' text-xs mt-2 sm:mt-0'> <b>Good for </b> <span className=' underline'>{props.SelectedMenu.serves}</span> </p>
                    </div>
                   
                </div>
                

                <Button size="sm" onClick={props.back}>Back</Button>
              </div>

              <p>
               
              </p>
            </div>


        
            {/* Ingredients */}           
            <div className=" flex flex-col text-accent-foreground items-start w-full min-h-[20px] pl-[82px] sm:pl-[10px] pt-5 sm:pt-2 gap-3">
              <p className="text-base  font-bold ">Ingredients:</p>
              <ul className=" pl-[70px] sm:text-sm sm:pl-[10px] font-semibold text-start " >
              {
                props.SelectedMenu.ingredients?
                    props.SelectedMenu.ingredients.map((e:any,key:any)=>(
                       
                        <li className=' sm:text-sm' key={key}>📙 {e}</li>
                       
                        
                    )):""
                }
                
              </ul>

              
            </div>

            {/* Cooking steps */}
            <div className=" flex flex-col items-start w-full min-h-[20px] text-accent-foreground pl-[82px] sm:pl-[10px] pt-10 gap-3">
              <p className="text-base font-bold ">Cooking Steps:</p>
              <ul className=" pl-[70px]  sm:text-sm sm:pl-[10px]  text-start font-normal " >
                {props.SelectedMenu.cooking_steps?
                    props.SelectedMenu.cooking_steps.map((e:any,id:any)=>(
                        <li  key={id}>{e}</li>
                    )):""
                }
                
              </ul>
            </div>


          </div>
        </div>
      </div>
     
    </>
  )
}

export default SelectedPage