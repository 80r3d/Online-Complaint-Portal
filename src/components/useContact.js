import { useState} from "react";

const useContact = (initialContactValues) => {
    const [cont, setCont] = useState(initialContactValues)
    

    const handleContChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setCont({
            ...cont,
            ...fieldValue
        })
      
        
    }

    const resetCont = () => {
        setCont({
            ...initialContactValues
        })
    
        
    }
 

    return {
        cont,
        setCont,
        handleContChange,
        resetCont
    };
}

export default useContact;