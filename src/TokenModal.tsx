import React, { useState } from "react";

interface Token {
    id: string;
    name: string;
}

interface TokenModalProps{
    onSelectToken: (tokenName:string) => void;
}

function TokenModal({onSelectToken}:TokenModalProps) {
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

    const onClickToken = (token: Token) => {
        onSelectToken(token.name);
    }

    return (
        <div>
            {/*검색 기능 구현*/}
            <input className="tokenmodalSearchInput"
                type="text" 
                value={userInput} 
                onChange={inputChange} 
                placeholder="Search Token"
            />

            {/*목록 표시*/}
            <ul className="tokenmodalContainer">
                {searchedFromTokenList.map((token)=>(
                <li 
                    key={token.id} 
                    className="tokenmodal"
                    onClick={()=>onClickToken(token)}
                >
                        {token.name}
                </li>
            ))}</ul>
        </div>
    );
}

export default TokenModal;
