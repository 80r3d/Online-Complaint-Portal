
import { useState } from "react";

const useLoc = (initialLocValues) => {
    const [locations, setLocations] = useState(initialLocValues)
    

    const handleLocChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setLocations({
            ...locations,
            ...fieldValue
        })
       
        
    }

    const resetPopupForm = () => {
        setLocations({
            ...initialLocValues
        })
       
        
    }
 

    return {
        locations,
        setLocations,
        handleLocChange,
        resetPopupForm
    };
}

export default useLoc;


