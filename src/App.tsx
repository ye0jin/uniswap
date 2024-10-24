import React, { useEffect, useState } from 'react';
import './App.css';
import Data from "./Data";

function App() {
    const [inputValue1, setInputValue1] = useState<string>("");
    const [inputValue2, setInputValue2] = useState<string>("");

    const [calValue1, setCalValue1] = useState<number>();
    const [calValue2, setCalValue2] = useState<number>();

    const [selectToken1, setSelectToken1] = useState<string>("DAI"); // 초기값은 Dai
    const [selectToken2, setSelectToken2] = useState<string>("USDC"); // 초기값은 USDC

    const [openPanel, setOpenPanel] = useState<boolean>(false); // openpanel bool
    const [inputIdx, setInputIdx] = useState<number>(0);

    const [tokenData, setTokenData] = useState();

    const tokenId1 = Data.tokens.find(token => token.name === selectToken1)?.id; // token1 id
    const tokenId2 = Data.tokens.find(token => token.name === selectToken2)?.id; // token2 id

    // input이 change 될 때 호출해줄 것
    const inputChange = (idx: number, value: string) => {
        if (idx === 1) { // 1이면 inputvalue1을 받은 value로 변경해주고
            setInputValue1(value);
        }
        else if (idx === 2) { // 동일하게 2도 작동
            setInputValue2(value);
        }
    };

    const isButton = inputValue1 && inputValue2; // inputvalue1 이랑 2에 둘 다 있을 경우 스왑 버튼이 활성화되게

    // 선택된 토큰
    const selectToken = (tokenName: string) => {
        if (inputIdx === 1) setSelectToken1(tokenName); // 1
        else if (inputIdx === 2) setSelectToken2(tokenName); //2
        setOpenPanel(false); // openpanel은 false
    };

    // update
    const updateMonetaryValue = (tokenId: string, idx: number) => {
        Data.fetchTokenPrice(tokenId)
            .then(price => {
                setTokenData(price);
                if (idx == 1) setCalValue1(price);
                else setCalValue2(price);
                return price; // return price
            })
    };

    useEffect(()=>{
        if (tokenId1) {
            updateMonetaryValue(tokenId1, 1); // set
        }
        if (tokenId2) {
            updateMonetaryValue(tokenId2, 2); // set
        }
    }, []) // 초기 set

    useEffect(() => {
        if (tokenId1) {
            updateMonetaryValue(tokenId1, 1);

            // const parseValue = parseFloat(inputValue1);
            // if(inputValue1 != null && calValue1 != null && calValue2 != null)
            // {
            //     if(isNaN(parseValue)){
            //         setInputValue2("");
            //     }
            //     else {
            //         setInputValue2(`${parseValue * (calValue2/calValue1)}`);
            //     }
            // }
        }
    }, [selectToken1, inputValue1]); // 변경될 때마다 
    useEffect(() => {
        if (tokenId2) {
            updateMonetaryValue(tokenId2, 2);

            // const parseValue = parseFloat(inputValue2);
            // if(inputValue1 != null && calValue1 != null && calValue2 != null)
            // {
            //     if(isNaN(parseValue)){
            //         setInputValue1("");
            //     }
            //     else {
            //         setInputValue1(`${parseValue * (calValue1/calValue2)}`);
            //     }
            // } // 여기 오류가 너무 많음 ㅠ
        }
    }, [selectToken2, inputValue2]) // 변경될 때마다


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
                            {1} {selectToken2} = {(calValue1 / calValue2).toFixed(10)} {selectToken1}
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
