
import React, { useState, useMemo } from "react";

export default function useTecnsActive(tecns) {
  const [changedTecns, setChangedTecns] = useState({})

  /**
   * Add or remove the tecn from the dictionary of changed tecns.
   * @param {string} new_value "Sim" or "Não" , new state
   * @param {*} id Tecn id
   * @param {str} title 
   */
  const changeActivePhase = (new_value, id, title) => {

    const objIndex = tecns.findIndex((obj => obj.id === id));
    if (title === "Active") {
      // Convert string to value that DB could store
      const to_store = new_value === "Sim" ? 1 : 0
      tecns[objIndex].active = to_store
    }
    if (id in changedTecns) {
      let copyChangedTecns = { ...changedTecns }
      delete copyChangedTecns[id]
      setChangedTecns(old => ({
        ...copyChangedTecns
      }))
    }
    else {
      setChangedTecns({ ...changedTecns, [id]: { "answer": new_value, date: new Date() } })
    }
  }
/**
 * If true is returned, the option to set the table is disabled.
 * @param {int} active 
 * @param {int} tecnId 
 * @returns 
 */
const checkTecnActive = (active, tecnId) => {
    const tecnSetInactive = tecnId in changedTecns && changedTecns[tecnId]["answer"] === "Não"
    // True => Disabled
    // If the tecn is not active, is out, the datepicker is disabled
    // If the tecn was changed to a state of "Não", it will allow do datepick
    return active === 0 || !tecnSetInactive
  }

  /**
   * When user change the tecn date out.
   * @param {int} tecnId 
   * @param {*} date 
   */
  const setTecnDateOut = (tecnId, date) => {
    const oldValue = changedTecns[tecnId]["answer"]
    setChangedTecns({ ...changedTecns, [tecnId]: { "answer": oldValue, date: date._d } })
  }
  return { changedTecns, changeActivePhase, checkTecnActive, setTecnDateOut };

}