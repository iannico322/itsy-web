import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckBox } from "../checkBox/checkBox"



export function Dropdown(props:any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild id={props.id}>
        <Button variant="outline"  className=" size-sm text-accent-foreground  min-w-[40px] sm:w-[80px] gap-2   ">+ <span className=" hidden sm:flex"> Pref.</span> <span className="sm:hidden">{props.text}</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <CheckBox/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
