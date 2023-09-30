import { Skeleton } from "../ui/skeleton"


const MenuLoader = () => {
  return (
    <>
    <div className="w-full h-10 flex gap-3 px-4">
      <div className=" flex flex-col w-full gap-2">
        <Skeleton className="w-full h-[20px] rounded-sm" />
        <Skeleton className="w-full h-[20px] rounded-sm" />
      </div>
      
      <Skeleton className="w-[40px] h-[40px] rounded-full" />
    </div>

    <div className="w-full h-10 flex gap-3 px-4">
      <div className=" flex flex-col w-full gap-2">
        <Skeleton className="w-full h-[20px] rounded-sm" />
        <Skeleton className="w-full h-[20px] rounded-sm" />
      </div>
      
      <Skeleton className="w-[40px] h-[40px] rounded-full" />
    </div>

    <div className="w-full h-10 flex gap-3 px-4">
      <div className=" flex flex-col w-full gap-2">
        <Skeleton className="w-full h-[20px] rounded-sm" />
        <Skeleton className="w-full h-[20px] rounded-sm" />
      </div>
      
      <Skeleton className="w-[40px] h-[40px] rounded-full" />
    </div>
    <div className="w-full h-10 flex gap-3 px-4">
      <div className=" flex flex-col w-full gap-2">
        <Skeleton className="w-full h-[20px] rounded-sm" />
        <Skeleton className="w-full h-[20px] rounded-sm" />
      </div>
      
      <Skeleton className="w-[40px] h-[40px] rounded-full" />
    </div>
    
    
    </>
  )
}

export default MenuLoader