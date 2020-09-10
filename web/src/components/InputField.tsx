import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    label: string,
    placeholder: string
}

export const InputField: React.FC<InputFieldProps> = (props) => {
    const [ field, { error } ] = useField(props)

    return (
        <FormControl isInvalid={ !!error }>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input { ...field } id={ field.name }
                   placeholder={props.placeholder}/>
            { error ? <FormErrorMessage>{ error }</FormErrorMessage> : null }
        </FormControl>
    )
}