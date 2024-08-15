
import  BarChart from 'CommonComponents/BarGraph/Barchart';
import './GraphAllAllocation.scss';

export default function GraphAllAllocation({ urlBackend }) {

    return (
        <div >
            <div className="everything">
                <BarChart urlBackend={urlBackend} tecnName={undefined}/>
            </div>
        </div>
    )
}