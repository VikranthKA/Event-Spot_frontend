import {useState} from 'react'
import {z} from 'zod'

const ReviewSchema = z.object({
    title:z.string().required(),

    body:z.string().required(),

    rating:z.number().min(0.5).max(5).required(),

    
})

export function useReviewValidation(initalValues){
    const [values,setValues] = useState(initalValues)
    const [errors,setErrors] = useState({})

    const validate = (inputValues)=>{
        try{
            ReviewSchema.parse(inputValues)
            setErrors({})
            return true
        }catch(error){
            setErrors(error.errors)
            return false
        }
    }



    const handleChange = (e)=>{
        const {name,value} = e.target 
        setValues({
            ...values,
            [name]:value
        })
    }

    return{
        values,errors,handleChange,validate
    }
}