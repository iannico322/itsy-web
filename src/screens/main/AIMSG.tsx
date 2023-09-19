

function AIMSG({e}: any) {
  return (
    <div className=" animate__animated animate__fadeInUp w-[100%] min-h-[15px]  flex items-center justify-start  py-3 ">
      <div className="px-5 py-2 min-w-[10px] max-w-[60%] md:max-w-[90%] ml-5 text-sm text-accent-foreground/70 rounded-md bg-muted  border-[1px] ">
        {e.image ? (
          <>
            <p className="pt-1 pb-4 ">{e.message}</p>
            <img
              className="object-contain rounded-lg min-w-56 min-h-52 max-h-56"
              src={e.image}
            />
          </>
        ) : (
          ""
        )}
        {e.message? <>
            <p className="  ">{e.message}</p>
        </>
        :
        ""    
    }    
        

      </div>
    </div>
  );
}

export default AIMSG;
