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
interface TokenPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectToken: (name: string) => void;
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
        .then(res => res.data[tokenId]?.usd);
};

// InputHolder
const InputHolder: React.FC<InputHolderProps> = ({
    idx,
    inputValue,
    onChange,
    onOpenPanel,
    selectTokenName,
}) => (
    <div className="inputholder">
        <MainInput value={inputValue} onChange={(v: string) => onChange(idx, v)} />
        <button
            className="tokenbutton selected"
            onClick={onOpenPanel}
        >
            {selectTokenName}
        </button>
        <div className="valueText">
            0 USD
        </div>
    </div>
);

// Inputholder 안에인풋
const MainInput: React.FC<{ value: string, onChange: (value: string) => void }> = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState<string>(value);

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        if (
            value.startsWith(".") || // 처음부터 소수점이거나
            (value.length > 1 && value.startsWith("0") && !value.includes(".")) // 0을 두 번 이상 입력했을 때 (근데 소수점 뒤가 아닐 경우)
          )
            return;
            
        if (/^(\d+(\.\d{0,10})?|\.)?$/.test(value)) {
            setInputValue(value);
            onChange(value);
        }
    };

    return (
        <input
            className="maininput"
            value={inputValue}
            onChange={changeValue}
            type="text"
            placeholder="0.0"
        />
    );
};

// 토큰 패널, 토큰 select 해주는곳
const TokenPanel: React.FC<TokenPanelProps> = ({ isOpen, onClose, onSelectToken }) => {
    const [userInput, setUserInput] = useState<string>('');
    const [recentTokenList, setRecentTokenList] = useState<Token[]>([]);

    const searchedFromTokenList = tokens.filter((token) =>
        token.name.toLowerCase().includes(userInput.toLowerCase())
    );

    // 최근 토큰 목록
    useEffect(() => {
        const lastRecentToken = localStorage.getItem('recent');
        if (lastRecentToken) {
            setRecentTokenList(JSON.parse(lastRecentToken));
        }
    }, []);

    const updateRecentTokenList = (token: Token) => {
        setRecentTokenList((prevRecentTokenList) => {
            const newRecentTokenList = prevRecentTokenList.filter(t => t.id !== token.id);
            newRecentTokenList.unshift(token);

            if (newRecentTokenList.length > 7) {
                newRecentTokenList.pop();
            }

            localStorage.setItem('recent', JSON.stringify(newRecentTokenList));
            return newRecentTokenList;
        });
    };

    const onClickToken = (token: Token) => {
        updateRecentTokenList(token);
        onSelectToken(token.name);
        setUserInput("");

        onClose();
    };

    return !isOpen ? null : (
        <div className="tokenpanel">
            <div className="tokenpanelHeader">
                <h4>토큰 선택</h4>
                <button className="tokenpanelClosebtn" onClick={() => { setUserInput(""); onClose(); }}>❌</button>
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
                        <li key={token.id} className="tokenmodal" onClick={() => onClickToken(token)}>
                            {token.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="tokenpanelFooter">
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
