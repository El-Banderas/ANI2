
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import TextComponentPrimary from '../TextComponents/TextPrimary';
import "moment/locale/pt";
export default function ColumnDatePicker({text, dateState, changeDateFunction}) {

const MyPickDate = ({ date, changeDateFunction }) => {
    return (
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"pt"} >
        <DatePicker
          label="Selecionar data"
          inputformat="dd-MMMM-yyyyy"
          mask="__/__/____"
          placeholder="dd/MM/yyyy"
          okLabel="Escolher"
          clearLabel="Limpar"
          cancelLabel="Cancelar"
          value={date}
          format="L"
          views={["year", "month", "date"]}
          onChange={(dateChanged) => changeDateFunction(dateChanged)}
        />
      </MuiPickersUtilsProvider>

    )
  }


  return (

      <div className='flexVertical'>
        <TextComponentPrimary text={text} size={30} />
        <MyPickDate date={dateState} changeDateFunction={changeDateFunction} />

      </div>
  );
}