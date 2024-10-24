import React, { useState, useEffect } from "react";
import axios from "axios";

interface Token {
    id: string;
    name: string;
}

interface InputHolderProps {
    idx: number;
    inputValue: string;
    onChange: (idx: number, value: string) => void;
    onOpenPanel: () => void;
    selectTokenName: string;
}

const tokens: Token[] = [
    { id: 'ethereum', name: 'ETH' },
    { id: 'tether', name: 'USDT' },
    { id: 'usd-coin', name: 'USDC' },
    { id: 'dai', name: 'DAI' },
    { id: 'aave', name: 'AAVE' },
    { id: 'bitcoin', name: 'WBTC' },
    { id: 'axie-infinity', name: 'AXS' },
    { id: 'compound-coin', name: 'COMP' },
    { id: 'curve-dao-token', name: 'CRV' },
    { id: 'ethereum-name-service', name: 'ENS' },
];

const fetchTokenPrice = (tokenId: string) => {
    return axios.get(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${tokenId}`)
        .then(res => res.data[tokenId]?.usd) // usd 리턴
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
};

// inputHolder
const InputHolder: React.FC<InputHolderProps> = ({
    idx,
    inputValue,
    onChange,
    onOpenPanel,
    selectTokenName,
}) => {
    const [inputValueState, setInputValueState] = useState<string>(inputValue); // input으로 받는 값
    const [calValue, setCalValue] = useState<number>(0);

    useEffect(() => {
        setInputValueState(inputValue);
    }, [inputValue]); // inputValue가 바뀔 때마다 
    useEffect(()=>{
        fetchTokenPrice(selectTokenName).then(price => {
            const inputV = parseFloat(inputValueState); // string > number
            if (!isNaN(inputV) && price !== undefined) {
                setCalValue(price * inputV); 
            } else {
                setCalValue(0); // NaN일 경우 0
            }
        })
    },[inputValue, selectTokenName]) // 셀렉 토큰이 바뀔 때마다

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // 입력 받은 값
        if (
            value.startsWith(".") || // 처음부터 소수점이거나
            (value.length > 1 && value.startsWith("0") && !value.includes(".")) // 0을 두 번 이상 입력했을 때 (근데 소수점 뒤가 아닐 경우)
        )
            return; // 리턴

        if (/^(\d+(\.\d{0,10})?|\.)?$/.test(value)) { // 숫자, 소수점 판별
            setInputValueState(value); // input에 value를 set
            onChange(idx, value);
        }
    };

    return (
        <div className="inputholder">
            <input
                className="maininput"
                value={inputValueState}
                onChange={changeValue}
                type="text"
                placeholder="0.0"
            />
            <button
                className="tokenbutton selected"
                onClick={onOpenPanel}
            >
                {selectTokenName} {/*select 된 token 이름으로 버튼 설정*/}
            </button>
            <div className="valueText">
                ${calValue} {/*추후 $ 변경*/}
            </div>
        </div>
    );
};

// 토큰 패널, 토큰 select 해주는곳
const TokenPanel: React.FC<{ isOpen: boolean; onClose: () => void; onSelectToken: (name: string) => void; }> = ({ isOpen, onClose, onSelectToken }) => {
    const [userInput, setUserInput] = useState<string>(''); // 검색창 입력
    const [recentTokenList, setRecentTokenList] = useState<Token[]>([]); // 최근 토큰 리스트

    // 토큰 리스트에서 소문자로 tolowercase userinput이랑 비교하여 같은 값이 있는지 (inclue) 찾기
    const searchedFromTokenList = tokens.filter((token) =>
        token.name.toLowerCase().includes(userInput.toLowerCase())
    );

    // 최근 토큰 목록 localStorage에서 가져오기
    useEffect(() => {
        const lastRecentToken = localStorage.getItem('recent');
        if (lastRecentToken) {
            setRecentTokenList(JSON.parse(lastRecentToken)); // JSON 데이터를 해당 스크립트에서 사용하기 위해
        }
    }, []);

    // 최근 토큰 리스트 업데이트 해주기
    const updateRecentTokenList = (token: Token) => {
        setRecentTokenList((prevRecentTokenList) => {
            const newRecentTokenList = prevRecentTokenList.filter(t => t.id !== token.id); // 중복 제거해주기
            newRecentTokenList.unshift(token); // 넣어주고

            if (newRecentTokenList.length > 7) { // 7개 이상이면
                newRecentTokenList.pop(); // 하나씩 pop 해주기
            }

            localStorage.setItem('recent', JSON.stringify(newRecentTokenList)); // string 형식으로 저장하기 위해 stringify 함수 사용
            return newRecentTokenList; // 그렇게 만들어진 새로운 list 리턴
        });
    };

    // 클릭
    const onClickToken = (token: Token) => {
        updateRecentTokenList(token); // 최근에 선택한거 한 번 업데이트 해주고
        onSelectToken(token.name); // select된 토큰 변경
        setUserInput(""); // 검색어 초기화

        onClose();
    };

    return !isOpen ? null : ( // isopen 안 열리면 null 열려있음 {}
        <div className="tokenpanel">
            <div className="tokenpanelHeader">
                <h4>토큰 선택</h4>
                <button className="tokenpanelClosebtn" onClick={() => onClose()}>❌</button> {/*X 버튼*/}
            </div>
            <div>
                <input
                    className="tokenmodalSearchInput"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="토큰을 검색하세요."
                />
                <ul className={`recentTokenHolder ${recentTokenList.length <= 0 ? 'none' : ''}`}>
                    {recentTokenList.map((token) => (
                        <li
                            key={token.id}
                            className="recentToken"
                            onClick={() => onClickToken(token)}
                        >
                            {token.name}
                        </li>
                    ))}
                </ul>
                <ul className={`tokenmodalContainer ${recentTokenList.length <= 0 ? 'none' : ''}`}>
                    {searchedFromTokenList.map((token) => (
                        <li 
                            key={token.id} 
                            className="tokenmodal" 
                            onClick={() => onClickToken(token)}
                        >
                            {token.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="tokenpanelFooter"> {/*하단*/}
                <button className="tokenpanelFooterBtn" onClick={() => alert("준비 중입니다.")}>
                    토큰 목록 관리
                </button>
            </div>
        </div>
    );
};

export default {
    InputHolder,
    TokenPanel,
    fetchTokenPrice,
    tokens,
};
