import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    label: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, size, ...props }) => {
    const [ field, { error } ] = useField(props)
    console.log(props)

    return (
        <FormControl isInvalid={ !!error }>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input { ...field } {...props} id={ field.name }
            />
            { error ? <FormErrorMessage>{ error }</FormErrorMessage> : null }
        </FormControl>
    )
}