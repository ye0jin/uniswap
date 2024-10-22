import React, { useState } from "react";

interface Token {
    id: string;
    name: string;
}

function TokenModal() {
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
    
    const tokenList: JSX.Element[] = tokens.map((token) => (
        <li key={token.id} className="tokenmodal">
            {token.name}
        </li>
    ));

    const [userInput, setUserInput] = useState('');
    const inputChange = (v:React.ChangeEvent<HTMLInputElement>)=>{
        setUserInput(v.target.value.toLowerCase()); // 소문자 변경
    }

    const searchedFromTokenList = tokens.filter((token) =>
        token.name.toLowerCase().includes(userInput) // tokens에서 필터링
    );

    return (
        <div>
            <input 
                type="text" 
                value={userInput} 
                onChange={inputChange} 
            />

            <ul>{tokenList}</ul>
        </div>
    );
}

export default TokenModal;
