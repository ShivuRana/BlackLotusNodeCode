import React, { useState, useEffect } from "react";

// services
import Services from "../../Services/auth.service";

const QuizSelect = ({ audioSuggestionId, onChangeAudioSuggestion }) => {

    const [id, setId] = useState('')
    const [audioOption, setAudioSuggestionOption] = useState([])

    useEffect(() => {
        setId(audioSuggestionId)
        function getAudioSuggestion() {
            Services.getAudioSuggestion()
                .then((response) => {
                    console.log(response,"response Audio")
                    if (response.data.status === 200) {
                        setAudioSuggestionOption(response.data.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getAudioSuggestion()
    }, [audioSuggestionId])

    const onFieldChange = (e) => {
        setId(e.target.value)
        onChangeAudioSuggestion(e.target.value)
    }

    return (
        <>
            <label>Select Audio Suggestion*</label>
            <div class="dropdown">
                <select
                    className="cstm-moduldroupdown2"
                    name="quiz"
                    value={id}
                    onChange={onFieldChange}
                >
                    {audioOption.map((item, i) => (
                        <option key={i} value={item._id}>{item.suggesionName}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default QuizSelect