import React, { useState, useEffect } from "react";

// services
import Services from "../../Services/auth.service";

const ModuleSelect = ({ moduleId, monthtype, yeartype, onChangeModule }) => {
    const [id, setId] = useState('')
    const [monthType, setmonthType] = useState('')
    const [yearType, setyearType] = useState('')
    const [moduleOption, setModuleOption] = useState([])

    useEffect(() => {
        setId(moduleId)
        setmonthType(monthtype)
        setyearType(yeartype)

        function getmoduleData() {
            var payload = {
                "month_type": monthtype,
                "year_type": yeartype,

            };
            console.log(payload, "payload")
            Services.GetModuleListing(payload)
                .then((response) => {
                    if (response.data.status === 200) {
                        setModuleOption(response.data.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getmoduleData()
    }, [moduleId])

    const onFieldChange = (e) => {
        setId(e.target.value)
        onChangeModule(e.target.value)
    }

    return (
        <>
            <label>Select Module*</label>
            <div class="dropdown">
                <select
                    className="cstm-moduldroupdown2"
                    name="module"
                    value={id}
                    onChange={onFieldChange}
                >
                    {moduleOption.map((item, i) => (
                        <option key={i} value={item._id}>{item.name}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default ModuleSelect