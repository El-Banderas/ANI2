import CircularProgress from '@mui/material/CircularProgress';
import TableTecns from "./TableTecns";

import useGetTecns from './useGetTecns'

export default function LoadTecns({ urlBackend, submissionDone }) {

    const { tecns } = useGetTecns(urlBackend);

    return <div>
        {Object.keys(tecns).length > 0 ?
            <TableTecns tecns={tecns} urlBackend={urlBackend} submissionDone={submissionDone} />
            :
            <div>
                <h1>Loading</h1>
                <CircularProgress />
            </div>
        }
    </div>
}