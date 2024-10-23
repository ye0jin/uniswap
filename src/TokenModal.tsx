import React, { useEffect, useState } from "react";
import axios from "axios";

interface Token {
    id: string;
    name: string;
}

interface TokenModalProps {
    onSelectToken: (tokenName: string) => void;
}

function TokenModal({ onSelectToken }: TokenModalProps) {
    const [tokens, setTokens] = useState<Token[]>([
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
    ]);

    const [tokenData, setTokenData] = useState();
    const updateMonetaryValue = (idx: number) => {
        if (idx < 0 || idx >= tokens.length) return;

        axios.get(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${tokens[idx].id}`).then((res) => {
            console.log(res.data[tokens[idx].id]['usd']);
            setTokenData(res.data[tokens[idx].id]['usd']);
        });
    };

    const [recentTokenList, setRecentTokenList] = useState<Token[]>([]);
    const [userInput, setUserInput] = useState('');

    const inputChange = (v: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(v.target.value.toLowerCase()); // 소문자 변경
    };

    const searchedFromTokenList = tokens.filter((token) =>
        token.name.toLowerCase().includes(userInput)
    );

    const onClickToken = (token: Token) => {
        updateRecentTokenList(token);
        onSelectToken(token.name);
    };

    const updateRecentTokenList = (token: Token) => {
        setRecentTokenList((prevRecentTokenList) => {
            const newRecentTokenList = prevRecentTokenList.filter(t => t.id !== token.id); // 중복 제거
            newRecentTokenList.unshift(token); // 추가

            if (newRecentTokenList.length > 7) {
                newRecentTokenList.pop();
            }
            localStorage.setItem('recent', JSON.stringify(newRecentTokenList));

            return newRecentTokenList;
        });

        let idx = searchedFromTokenList.indexOf(token);
        updateMonetaryValue(idx);
    };

    useEffect(() => {
        const tokens = localStorage.getItem('recent'); // 가져오기
        if (tokens) { // 있으면
            const parsedToken = JSON.parse(tokens);
            setRecentTokenList(parsedToken);
        }
    }, []);

    return (
        <div>
            <input className="tokenmodalSearchInput"
                type="text"
                value={userInput}
                onChange={inputChange}
                placeholder="Search Token"
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
    );
}

export default TokenModal;
