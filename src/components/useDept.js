import { useState } from "react";

const useDept = (initialDeptValues) => {
    const [dep, setDep] = useState(initialDeptValues)
    

    const handleDeptChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setDep({
            ...dep,
            ...fieldValue
        })
      
        
    }

    const resetDept = () => {
        setDep({
            ...initialDeptValues
        })
    
        
    }
 

    return {
        dep,
        setDep,
        handleDeptChange,
        resetDept
    };
}

export default useDept;