
import { useState } from "react";
import axios from 'axios';

export default function useSubmitChanges( urlBackend, unchangedInput, date, submissionDone ) {

    const [changedProjs, setChangedProjs] = useState({})
    const [preventDoubleClick, setPreventDoubleClick] = useState(true)
    
const submit = () => {
        if (preventDoubleClick) {
            setPreventDoubleClick(false)
            axios({
                method: 'put',
                url: `${urlBackend}/scenarios/add_efforts`,
                data: {
                    "projects": changedProjs, //projects["projects"]
                    "projects_ids": unchangedInput["projects"].map(x => x.id),
                    "date": date
                    //"name" : "AAA"
                }
            }).then(
                (response) => {
                    submissionDone()
                }
            );

        }
        else {
            console.log("Don't click two times, please, just wait!!!")
        }
    }

    return {changedProjs, setChangedProjs, submit};
}