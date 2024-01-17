import React, { useState, useEffect } from "react";

// services
import Services from "../../Services/auth.service";

const QuizSelect = ({ quizid, onChangeQuiz }) => {

    const [id, setId] = useState('')
    const [quizOption, setQuizOption] = useState([])

    useEffect(() => {
        setId(quizid)
        function getQuizData() {
            Services.getQuize()
                .then((response) => {
                    if (response.data.status === 200) {
                        setQuizOption(response.data.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getQuizData()
    }, [quizid])

    const onFieldChange = (e) => {
        setId(e.target.value)
        onChangeQuiz(e.target.value)
    }

    return (
        <>
            <label>Select Quiz*</label>
            <div class="dropdown">
                <select
                    className="cstm-moduldroupdown2"
                    name="quiz"
                    value={id}
                    onChange={onFieldChange}
                >
                    {quizOption.map((item, i) => (
                        <option key={i} value={item._id}>{item.quizName}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default QuizSelect