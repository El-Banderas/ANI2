
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TextComponentPrimary from "../../TextComponents/TextPrimary";
import './SecondPage.scss'

import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

  const [openSave, setOpenSave] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);
  const valueRefSave = useRef('') 
  const valueRefChoose = useRef('') 
  const handleOpenSave = () => setOpenSave(true);
  const handleCloseSave = () => setOpenSave(false);
  const handleOpenChoose = () => setOpenChoose(true);
  const handleCloseChoose = () => setOpenChoose(false);
  const selectTecn = () => {
    const element = document.getElementById("SecPage-searchTecn").value;

    if (possibilities.includes(element)) {
      changeCurrentTecn(element)
    }
  }

  const thisButton = (texti, onClicki) => {
    return <div>
      <Button variant="outlined" onClick={onClicki} style={{
        borderRadius: 10,
        backgroundColor: "#32DBC4",
        margin: "0% 0% 1% 0%",
        fontSize: "14px",
        color: "black",
        fontWeight: "lighter",

      }} ><TextComponentPrimary text={texti} size={16} fontWeightGiven={"regular"} /></Button>
    </div>
  }

  const modalSave = (title, secondaryText, openF, closeF, btn,thisRef) => {
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
        renderInput={(params) => <TextField {...params} label="Worker" />}
      />
      {thisButton("Select worker", selectTecn)}
      {thisButton("Save scenario", handleOpenSave)}
      {thisButton("Select this scenario", handleOpenChoose)}
      {openSave && modalSave("Salvar cenário", "Insira o nome do cenário para ser guardado", openSave, handleCloseSave, thisButton("Salvar", () => saveScenario(valueRefSave.current.value)), valueRefSave)}
      {openChoose && modalSave("Escolher cenário", "", openChoose, handleCloseChoose, thisButton("Escolher", () => chooseScenarioToAllocation()), valueRefChoose)}
    </div>

  )
}