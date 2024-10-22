import React, { useState } from 'react';
import './App.css';
import InputHolder from "./InputHolder"; // InputHolder import
import TokenPanel from './TokenPanel';

function App() {
    const [inputValue1, setInputValue1] = useState<string>("");
    const [inputValue2, setInputValue2] = useState<string>("");

    const [openPanel, setOpenPanel] = useState<boolean>(false);

    const inputChange = (idx: number, value: string) => {
        if (idx === 1) setInputValue1(value);
        else if (idx === 2) setInputValue2(value);
    };

    const isButton = inputValue1 && inputValue2; // value가 둘 다 있을 경우

    return (
    <div className="container">
        <div className="mainbox">

            <header className="swapheader">
                <h3>스왑</h3>
                <button className="settingbutton" onClick={() => alert("준비 중입니다.")}>
                    ⚙️
                </button>
            </header>

            <InputHolder idx={1} inputValue={inputValue1} onChange={inputChange} onOpenPanel={()=>setOpenPanel(true)}/> {/*오픈 패널을 하면 true가 되도록 설정*/}
            <InputHolder idx={2} inputValue={inputValue2} onChange={inputChange} onOpenPanel={()=>setOpenPanel(true)}/>

            <button
                className={`sellbutton ${isButton ? 'enabled' : ''}`}
                onClick={() => alert("준비 중입니다.")}
                disabled={!isButton}
            >
                {isButton ? "스왑" : "금액을 입력하세요"}
            </button>
        </div>
        <TokenPanel isOpen={openPanel} onClose={() => setOpenPanel(false)}/>
    </div>  
    );
}

export default App;
