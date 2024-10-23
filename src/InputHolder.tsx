import React, { useState, useEffect } from "react";
import MainInput from "./MainInput";
import TokenPanel from "./TokenPanel";

interface InputHolderProps {
    idx: number;
    inputValue: string;
    onChange: (idx: number, value: string) => void; 
    onOpenPanel: () => void;
    selectTokenName: string;
}

const InputHolder: React.FC<InputHolderProps> = ({
    idx,
    inputValue,
    onChange, 
    onOpenPanel,
    selectTokenName,
}) => {
    //const isSelected = selectTokenName != 'Select Token';

    return (
        <div className="inputholder">
            <MainInput value={inputValue} onChange={(v: string) => onChange(idx, v)} />
            
            <button 
                className={`tokenbutton selected`/*`tokenbutton ${isSelected ? 'selected' : ''}`*/}
                onClick={onOpenPanel}> {/*click시 opOpenPanel 함수 호출 (App -> true) 로 변경돼서 패널이 열림*/}
                {selectTokenName}
            </button>
        </div>

    );
};

export default InputHolder;
