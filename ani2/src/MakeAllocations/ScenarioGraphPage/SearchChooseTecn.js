import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import TextComponentPrimary from "CommonComponents/TextComponents/TextPrimary";
import './SecondPage.scss'

import MyButton from 'CommonComponents/MyButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function SeachChooseTecn({ possibilities, changeCurrentTecn, saveScenario, chooseScenarioToAllocation}) {
  /**
   * There are two different modals, so it is important to have different states, one for each of them.
   */

  const [openModalSave, setOpenModalSave] = useState(false);
  const [openModalChoose, setOpenModalChoose] = useState(false);
  const valueRefSave = useRef('') 
  const valueRefChoose = useRef('') 

  const handleOpenSave = () => setOpenModalSave(true);
  const handleCloseSave = () => setOpenModalSave(false);
  const handleOpenChoose = () => setOpenModalChoose(true);
  const handleCloseChoose = () => setOpenModalChoose(false);
  
  const selectTecn = () => {
    const element = document.getElementById("SecPage-searchTecn").value;

    if (possibilities.includes(element)) {
      changeCurrentTecn(element)
    }
  }

  const modal = (title, secondaryText, openF, closeF, btn,thisRef) => {
    return (
      <Modal
        open={openF}
        onClose={closeF}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">

          <TextComponentPrimary text={title} size={20} fontWeightGiven={"bold"} />
          <TextComponentPrimary text={secondaryText} size={15} fontWeightGiven={"bold"} />
          {secondaryText.length > 2 &&
            <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Solução"
            inputRef={thisRef}
          />
  }
          <div>
          {btn}
          </div>
        </Box>
      </Modal>
    )
  }

  return (
    <div className='searchTecn'>
      <Autocomplete
        disablePortal
        id="SecPage-searchTecn"
        options={possibilities}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Técnico" />}
      />
      <MyButton text={"Selecionar técnico"} onClicki={selectTecn} />
      <MyButton text={"Salvar cenário"} onClicki={handleOpenSave} />
      <MyButton text={"Escolher este cenário"} onClicki={handleOpenChoose} />
      {openModalSave && modal("Salvar cenário", "Insira o nome do cenário para ser guardado", openModalSave, handleCloseSave, <MyButton text={"Salvar"}  onClicki={() => saveScenario(valueRefSave.current.value)} />, valueRefSave)}
      {openModalChoose && modal("Escolher cenário", "", openModalChoose, handleCloseChoose, <MyButton text={"Escolher"} onClicki={() => chooseScenarioToAllocation()} />, valueRefChoose)}
    </div>

  )
}