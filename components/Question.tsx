import axios from "axios";
import React, { useState } from "react";

export default function Question({ text, id }: { text: string, id: number }) {

    const [isEditing, setEditing] = useState(false);
    const [questionText, setQuestionText] = useState("")

    const handleEdit = async () => {
        
        axios.put(`https://qiz-api.herokuapp.com/questions/${id}`, {question : questionText})
        setEditing(false);

    }

    const handleEditing = async (e: React.FormEvent<HTMLInputElement>) => {

        setQuestionText(e.currentTarget.value);

    }

    return (<div className="mb-4">
        {isEditing ? 

            <input onChange={handleEditing} onBlur={handleEdit}>
            </input>


:

<label className="text-center block text-gray-700 text-lg font-bold mb-2" htmlFor="username" onClick={() => setEditing(true)}>
{text}
</label>
        
    
    }
       
    </div>
    )
}