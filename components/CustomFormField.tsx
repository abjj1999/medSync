"use client";
import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Form } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
  control: Control<any>
  name: string
  fieldType: FormFieldType
  label?: string
  iconAlt?: string
  iconSrc?: string
  placeholder?: string
  disabled?: boolean
  dataFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({field, props}: {field: any; props:CustomProps}) => {
  const {fieldType, iconAlt, iconSrc, placeholder, } = props
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image src={iconSrc} alt={iconAlt || "alt"} width={23} height={23} className='ml-2' />
          )}
          <FormControl>
            <Input {...field} placeholder={placeholder}  className='shad-input border-0'/>
          </FormControl>
        </div>
    )
    case FormFieldType.PHONE_INPUT: 
    return (
      <FormControl>
        <PhoneInput 
         defaultCountry='US'
         placeholder={placeholder}
         international
         withCountryCallingCode
         value={field.value as E164Number | undefined}
         onChange={field.onChange}
         className='input-phone'
        />
      </FormControl>
    )
    
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, fieldType, label } = props
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex-1'>
        {fieldType !== FormFieldType.CHECKBOX && label && (
          <FormLabel >{label}</FormLabel>
        )}
        <RenderField field={field}  props={props}/>

        <FormMessage className='shad-error'/>
      </FormItem>
    )}
  />
  )
}

export default CustomFormField
