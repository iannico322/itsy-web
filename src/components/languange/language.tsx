"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const languages = [
  { label: "English", value: "English" },
  { label: "Tagalog", value: "Tagalog" },
  { label: "Spanish", value: "Spanish" },
  { label: "Russian", value: "Russian" },
  { label: "Bisaya", value: "Bisaya" },
  { label: "UwU", value: "UwU" },
] as const

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
})

export function Language () {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  

  return (
    <Form {...form}>
      <form onSubmit={()=>{}} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between text-accent-foreground sm:w-[90px] sm:text-xs px-2",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : localStorage.getItem('Languange')}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Language..." />
                    <CommandEmpty>No  Language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            localStorage.setItem("Languange",language.value)
                            

                            toast({
                              title: "Language Swap!",
                              description: `Woohoo! We're now chit-chatting in ${language.value}!`,
                            });
                            form.setValue("language", language.value)
                            return (language.value)
                            
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
     
      </form>
    </Form>
  )
}
