"use client"

import * as React from "react"


import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,

} from "@/components/ui/navigation-menu"
import { useNavigate } from "react-router-dom"

export function Nav() {
  const navigate = useNavigate()
  return (
    <NavigationMenu className="  z-50 ">
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuTrigger className=" bg-card text-accent-foreground ">{JSON.parse(localStorage.getItem("user")||"").first_name} </NavigationMenuTrigger>
          <NavigationMenuContent className=" w-[300px] sm:w-[300px]  ">
            <ul className="grid gap-3   p-4 lg:grid-cols-[.75fr_1fr]">
              <li className="col-span-2 ">
                <NavigationMenuLink asChild className=" flex flex-wrap">
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    
                  >
              
                    <div className="mb-2 mt-4 text-lg font-medium">
                    {JSON.parse(localStorage.getItem("user")||"").first_name} {JSON.parse(localStorage.getItem("user")||"").last_name}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    {JSON.parse(localStorage.getItem("user")||"").email}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem className=" hover:text-red-700 cursor-pointer" onClick={()=>{
                navigate("/itsy-web/")
                localStorage.setItem("user","0")
                localStorage.setItem("key","0")

              }} title="Logout">
                 This will exit your account
              </ListItem>
             
           
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
       
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
