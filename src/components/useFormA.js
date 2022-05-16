import { useState } from "react";

const useFormA = (initialFieldValuesA) => {
    const [ifva, setIfva] = useState(initialFieldValuesA)
    

    const handleIfvaChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setIfva({
            ...ifva,
            ...fieldValue
        })
      
        
    }

    const resetIfva = () => {
        setIfva({
            ...initialFieldValuesA
        })
    
        
    }
 

    return {
        ifva,
        setIfva,
        handleIfvaChange,
        resetIfva
    };
}

export default useFormA;