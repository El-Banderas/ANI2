import './LandPage.scss';
import React, { useState, useRef } from "react";
import  BarChart  from "./Barchart";

export default function LandPageChart({ defaultInput, updateInput, urlBackend }) {

    return (
        <div >
            {/**Caso dê problemas, remover o everything */}
            <div className="everything">

                <BarChart urlBackend={urlBackend} tecnName={undefined}/>
            </div>
        </div>
    )

}