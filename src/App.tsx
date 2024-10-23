import React, { useEffect, useState } from 'react';
import './App.css';
import InputHolder from "./InputHolder"; // InputHolder import
import TokenPanel from './TokenPanel';

function App() {
    const [inputValue1, setInputValue1] = useState<string>("");
    const [inputValue2, setInputValue2] = useState<string>("");

    const [selectToken1, setSelectToken1] = useState<string>("Select Token");
    const [selectToken2, setSelectToken2] = useState<string>("Select Token");

    const [openPanel, setOpenPanel] = useState<boolean>(false);

    const [inputIdx, setInputIdx] = useState<number>(0);

    const inputChange = (idx: number, value: string) => {
        if (idx === 1) setInputValue1(value);
        else if (idx === 2) setInputValue2(value);
    };

    const isButton = inputValue1 && inputValue2; // value가 둘 다 있을 경우

    const selectToken = (tokenName: string) => {
        if (inputIdx === 1) setSelectToken1(tokenName);
        else if (inputIdx === 2) setSelectToken2(tokenName);
        setOpenPanel(false);
    };

    return (
        <div className="container">
            <div className="mainbox">

                <header className="swapheader">
                    <h3>스왑</h3>
                    <button className="settingbutton" onClick={() => alert("준비 중입니다.")}>
                        ⚙️
                    </button>
                </header>

                <InputHolder
                    idx={1}
                    inputValue={inputValue1}
                    onChange={inputChange}
                    onOpenPanel={() => { setInputIdx(1); setOpenPanel(true); }}
                    selectTokenName={selectToken1}
                /> {/*오픈 패널을 하면 true가 되도록 설정*/}

                <InputHolder
                    idx={2}
                    inputValue={inputValue2}
                    onChange={inputChange}
                    onOpenPanel={() => { setInputIdx(2); setOpenPanel(true) }}
                    selectTokenName={selectToken2}
                />

                <button
                    className={`sellbutton ${isButton ? 'enabled' : ''}`}
                    onClick={() => alert("준비 중입니다.")}
                    disabled={!isButton}
                >
                    {isButton ? "스왑" : "금액을 입력하세요"}
                </button>
            </div>
            <TokenPanel isOpen={openPanel} onClose={() => setOpenPanel(false)} onSelectToken={selectToken} />
        </div>
    );
}

export default App;