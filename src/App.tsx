import React, { useEffect, useState } from 'react';
import './App.css';
import Data from "./Data";

function App() {
    const [inputValue1, setInputValue1] = useState<string>("");
    const [inputValue2, setInputValue2] = useState<string>("");

    const [calValue1, setCalValue1] = useState<number | null>();
    const [calValue2, setCalValue2] = useState<number | null>();

    const [selectToken1, setSelectToken1] = useState<string>("DAI");
    const [selectToken2, setSelectToken2] = useState<string>("USDC");

    const [openPanel, setOpenPanel] = useState<boolean>(false);
    const [inputIdx, setInputIdx] = useState<number>(0);

    const [tokenData, setTokenData] = useState();

    const tokenId1 = Data.tokens.find(token => token.name === selectToken1)?.id;
    const tokenId2 = Data.tokens.find(token => token.name === selectToken2)?.id;

    const inputChange = (idx: number, value: string) => {
        if (idx === 1) {
            setInputValue1(value);
        }
        else if (idx === 2) {
            setInputValue2(value);
        }
    };

    const isButton = inputValue1 && inputValue2;

    const selectToken = (tokenName: string) => {
        if (inputIdx === 1) setSelectToken1(tokenName);
        else if (inputIdx === 2) setSelectToken2(tokenName);
        setOpenPanel(false);
    };

    const updateMonetaryValue = (tokenId: string, idx: number) => {
        Data.fetchTokenPrice(tokenId)
            .then(price => {
                setTokenData(price);
                if (idx == 1) setCalValue1(price);
                else setCalValue2(price);
                return price;
            })
    };

    useEffect(()=>{
        if (tokenId1) {
            updateMonetaryValue(tokenId1, 1);
        }
        if (tokenId2) {
            updateMonetaryValue(tokenId2, 2);
        }
    }, [])

    useEffect(() => {
        if (tokenId1) {
            updateMonetaryValue(tokenId1, 1);
        }
    }, [selectToken1, inputValue1]);
    useEffect(() => {
        if (tokenId2) {
            updateMonetaryValue(tokenId2, 2);
        }
    }, [selectToken2, inputValue2])


    return (
        <div className="container">
            <div className="mainbox">
                <header className="swapheader">
                    <h3>스왑</h3>
                    <button className="settingbutton" onClick={() => alert("준비 중입니다.")}>
                        ⚙️
                    </button>
                </header>
                <Data.InputHolder
                    idx={1}
                    inputValue={inputValue1}
                    onChange={inputChange}
                    onOpenPanel={() => { setInputIdx(1); setOpenPanel(true); }}
                    selectTokenName={selectToken1}
                />
                <Data.InputHolder
                    idx={2}
                    inputValue={inputValue2}
                    onChange={inputChange}
                    onOpenPanel={() => { setInputIdx(2); setOpenPanel(true); }}
                    selectTokenName={selectToken2}
                />

                <div className='transformValue'>
                    {calValue1 != null && calValue2 != null ? (
                        <div>
                            {1} {selectToken1} = {(calValue2 / calValue1).toFixed(10)} {selectToken2}
                        </div>
                    ) : ("")}
                </div>


                <button
                    className={`sellbutton ${isButton ? 'enabled' : ''}`}
                    onClick={() => alert("준비 중입니다.")}
                    disabled={!isButton}
                >
                    {isButton ? "스왑" : "금액을 입력하세요"}
                </button>
            </div>
            <Data.TokenPanel isOpen={openPanel} onClose={() => setOpenPanel(false)} onSelectToken={selectToken} />
        </div>
    );
}

export default App;
