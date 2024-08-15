import TextComponentPrimary from 'CommonComponents/TextComponents/TextPrimary'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import CircularProgress from '@mui/material/CircularProgress';
import useLogin from './useLogin';


export default function Login({ urlBackend, logInDone, setURLBackend }) {
  const {password, passwordValid, urlValid, loading, changePassword, submit} = useLogin(urlBackend, logInDone, setURLBackend);
  
  return (
    <div className="Login">
      <div className='flexVertical'>
        <TextComponentPrimary text={"Login"} size={30} />
        <TextField
          error={!passwordValid}
          label={!passwordValid && "Error"}
          id="PasswordTextField"
          defaultValue=""
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => changePassword(e.target.value)}
        />
        {/*URL backend part*/}
        <TextComponentPrimary text={"URL de backend"} size={30} />
        <TextField
          label={"Delete Later"}
          error={!urlValid}
          id="BackendURL"
          defaultValue={urlBackend}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setURLBackend(e.target.value)}
        />
        <Button variant="outlined" onClick={() => submit()} style={{
          borderRadius: 10,
          backgroundColor: "#32DBC4",
          margin: "0% 0% 1% 0%",
          fontSize: "14px",
          color: "black",
          fontWeight: "lighter",
        }} ><TextComponentPrimary text={"Submeter"} size={16} fontWeightGiven={"regular"} /></Button>


        {loading && <CircularProgress />}

      </div>
    </div>
  );
}

