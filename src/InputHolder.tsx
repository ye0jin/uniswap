import React, { useState, useEffect } from "react";
import MainInput from "./MainInput";
import TokenPanel from "./TokenPanel";

interface InputHolderProps {
    idx: number;
    inputValue: string;
    onChange: (idx: number, value: string) => void; 
    onOpenPanel: () => void;
}

const InputHolder: React.FC<InputHolderProps> = ({
    idx,
    inputValue,
    onChange, 
    onOpenPanel,
}) => {

    return (
        <div className="inputholder">
            <MainInput value={inputValue} onChange={(v: string) => onChange(idx, v)} />
            <button className="tokenbutton" onClick={onOpenPanel}> {/*click시 opOpenPanel 함수 호출 (App -> true) 로 변경돼서 패널이 열림*/}
                Select Token
            </button>
        </div>
    );
};

export default InputHolder;
