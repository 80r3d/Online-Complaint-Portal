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

    const resetSignup = () => {
        setValues({
            ...initialFieldValues
        })
    
        
    }
 

    return {
        values,
        setValues,
        handleChange,
        resetSignup
    };
}

export default useSignin;