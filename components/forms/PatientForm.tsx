"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"



export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON= "skeleton",
}

const PatientForm = () =>  {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormSchema>) {
    setIsLoading(true)
    

    try {
      const userData = {name, email, phone}

      const user = await createUser(userData)

      if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">
        Hi There! 👋
            </h1>
            <p className="text-dark-700">
                Schedule your appointment today.
            </p>
        </section>
        <CustomFormField 
        control={form.control}
        fieldType = {FormFieldType.INPUT}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        iconSrc= "/assets/icons/user.svg"
        iconAlt="User Icon"
        />
        <CustomFormField 
        control={form.control}
        fieldType = {FormFieldType.INPUT}
        name="email"
        label="Email"
        placeholder="example@medsync.com"
        iconSrc= "/assets/icons/email.svg"
        iconAlt="email Icon"
        />
        <CustomFormField 
        control={form.control}
        fieldType = {FormFieldType.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="=123 456 7890"
        
        />
        <SubmitButton isLoading={isLoading} >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
