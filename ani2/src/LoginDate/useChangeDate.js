import axios from 'axios';

export default function useChangeDate( urlBackend, setWaitingForLoading,dateInit, dateEnd, logInDone ) {
const changeDate = () => {

    console.log("[LOGIN DATES] Change data of filters")
    setWaitingForLoading(true)
    const date1Converted = typeof(dateInit) === "string" ? dateInit :  dateInit._d.toLocaleDateString('pt-PT')
    const date2Converted = typeof(dateEnd) === "string" ? dateEnd :  dateEnd._d.toLocaleDateString('pt-PT')
    axios({
      method: 'put',
      url: `${urlBackend}/login/change_filter_dates`,
      data: { "startFilterDate": date1Converted, "endFilterDate": date2Converted },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((respose) => {
      console.log("[LOGIN DATES] Server reloaded all data?")
      console.log(respose)
      setWaitingForLoading(false)
      logInDone()
    }
    )

  }

  return {changeDate}
}