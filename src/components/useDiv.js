import { useState } from "react";

const useDiv = (initialDivValues) => {
    const [div, setDiv] = useState(initialDivValues)
    

    const handleDivChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setDiv({
            ...div,
            ...fieldValue
        })
      
        
    }

    const resetDiv = () => {
        setDiv({
            ...initialDivValues
        })
    
        
    }
 

    return {
        div,
        setDiv,
        handleDivChange,
        resetDiv
    };
}

export default useDiv;