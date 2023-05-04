import productStyle from "./modules/ProductInfo.module.css";
import { useState } from "react";

function ProductInfo() {
    const [current, setCurrent] = useState(0);

  return (
    <div>
    
    <div className={productStyle.up}>
        <div onClick={() => setCurrent(0)} className={productStyle.secTag}>Home</div>
        <div onClick={() => setCurrent(1)} className={productStyle.secTag}>Basics</div>
        <div onClick={() => setCurrent(2)} className={productStyle.secTag}>History</div>
        <div onClick={() => setCurrent(3)} className={productStyle.secTag}>Contacts</div>
        <div onClick={() => setCurrent(4)} className={productStyle.secTag}>Team</div>
    </div>

    <div style={{margin: "16px 10px 35px 0px"}}><hr /></div>

    <div>
        {current===0 && <div>Current is 0</div>}
        {current===1 && <div>Current is 1</div>}
        {current===2 && <div>Current is 2</div>}
        {current===3 && <div>Current is 3</div>}
        {current===4 && <div>Current is 4</div>}
    </div>

    </div>

  )
}

export default ProductInfo
