import React,{memo, useState} from 'react'
import QRCode from "react-qr-code";

function QrGenerator({QrData}) {
    const [qrVar,setQrVar] = useState({
        // value,//empty 
        back:" ",//#FFFFFF bgcolor
        fore:" ",//#000000 color
        size:100//256 
    })
     


  return (
    <div className='Componet-Container'>
        <div className="qrCode" style={{textAlign:"center"}}>
            <QRCode value={QrData} size={qrVar.size} fore={qrVar.fore} back={qrVar.back} />
        </div>
    </div>
        
        


  )
}

export default memo(QrGenerator)