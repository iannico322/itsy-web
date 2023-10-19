import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

function UserMSG({ e, onDelete, mkey }: any) {
  return (
    <div className=" animate__animated animate__fadeInUp w-[100%] min-h-[15px]  flex items-center justify-end  py-3 ">
      <div className="px-5 py-2 min-w-[10px] max-w-[60%] md:max-w-[90%] mr-5 text-base text-white rounded-lg  bg-[#3dd44b]">
        {e.image ? (
          <>
            <p className="text-white/80 text-sm italic md:not-italic mb-2 ">{e.message}</p>
            <img
              className=" object-contain rounded-lg w-[100%] max-h-52 sm:max-h-20"
              src={e.image}
            />
          </>
        ) : (
          ""
        )}


       {!e.image? 
        <div className=" flex flex-col gap-0">
          <p className=" text-white/80 text-sm italic md:not-italic mb-2">
            {e.message}
          </p>

          <table key={mkey} className=" bg-card border-border rounded-md pb-2">
            <tr className=" text-xs text-accent-foreground ">
              <th className=" sm:py-2 py-4 sm:px-3  px-5">Name</th>
              <th className=" sm:py-2 py-4 sm:px-3 px-3">Quantity</th>
              <th className=" sm:py-2 py-4 sm:px-3 px-6">Action</th>
            </tr>

            {e.products.map((z: any, key2: any, key: any) => (
              <>
                <tr
                  className=" sm:text-[10px] self-center text-accent-foreground text-xs hover:bg-primary/30"
                  key={key}
                >
                  <td className="py-1 sm:px-3 px-5 text-center">
                    {z.itemName}
                  </td>
                  <td className="py-1 sm:px-3 px-3 text-center">{z.itemQK}</td>
                  <td className=" py-1 sm:px-3 px-6 text-center items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className=" bg-accent-foreground/20"
                      onClick={() => onDelete(mkey, key2)}
                    >
                      <TrashIcon className=" text-xs text-red-54 text-white/80 " />
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </table>
        </div>
        :""}
      </div>
    </div>
  );
}

export default UserMSG;
