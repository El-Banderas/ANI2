
import Button from '@mui/material/Button';
import TextComponentPrimary from "TextComponents/TextPrimary";

export default function MyButton({text, onClicki}){
    return <Button variant="outlined" onClick={onClicki} style={{
        borderRadius: 10,
        backgroundColor: "#32DBC4",
        margin: "0% 0% 1% 0%",
        fontSize: "14px",
        color: "black",
        fontWeight: "lighter",
      }} ><TextComponentPrimary text={text} size={16} fontWeightGiven={"regular"} /></Button>


}