"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"



const items = [
  {
    id: "Simple",
    label: "Simple",
  },
  {
    id: "Filipino",
    label: "Filipino",
  },
  {
    id: "Comfort Food",
    label: "Comfort Food",
  },
  {
    id: "Healthy",
    label: "Healthy",
  },
  {
    id: "Vegetarian",
    label: "Vegetarian",
  },
  {
    id: "Low-Carb",
    label: "Low-Carb",
  },
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})



export function CheckBox() {

  let storedItem = localStorage.getItem("SelectedPrefence");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: storedItem ? JSON.parse(storedItem) : [],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    localStorage.setItem("SelectedPrefence",JSON.stringify(data.items))

    toast({
      title: "Selected Preferences:",
      description: (
        <pre className="mt-2  min-w-full min-h-[100px] rounded-md bg-card-foreground text-accent p-4">
          <code className=" flex flex-wrap">{data.items.map((items: any)=> <p>{items}, </p> )}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form} >
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-8 px-2 py-2 pb-4">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Preference</FormLabel>
                <FormDescription>
                  Select you Preferences below
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              console.log(field.value,"here is check")
                     
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
