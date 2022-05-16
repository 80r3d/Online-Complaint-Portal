import  { useState } from "react";

const useSignin = (initialFieldValues) => {
    const [values, setValues] = useState(initialFieldValues)
    // const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
    
        
    }

    const resetSignin = () => {
        setValues({
            ...initialFieldValues
        })
    
        
    }
 

    return {
        values,
        setValues,
        handleChange,
        resetSignin
    };
}

export default useSignin;