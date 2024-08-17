import { useState } from "react";
import axios from 'axios';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

export default function useDownloadAllocation() {

    const fileName = "Alocação"
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
    const fileExtension = ".xlsx";

    const convertAllocationToExcel = (allocation) => {
        const excel = []
        for (const [tecnName, listIdProjs] of Object.entries(allocation)) {
            for (const idProj of listIdProjs)
                excel.push({"Técnico" : tecnName, "Projeto" : idProj})
}
return excel;
    }

    const downloadExcel = (allocation) => {
        const excelData = convertAllocationToExcel(allocation)
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { booktType: 'xlsx', type: "array" })
        const data1 = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data1, fileName + fileExtension)
    }

    return  {downloadExcel}
}
