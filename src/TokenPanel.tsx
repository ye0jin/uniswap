import React, { useState } from "react";
import TokenModal from "./TokenModal";

interface TokenPanelProps {
    isOpen: boolean;
    onClose: () => void; // 패널 닫기   
    onSelectToken:(name:string) => void;
}

const TokenPanel: React.FC<TokenPanelProps> = ({ isOpen, onClose, onSelectToken }) => {

    if (!isOpen) return null;

    return (
        <div className="tokenpanel">
            <div className="tokenpanelHeader">
                <h4>토큰 선택</h4>
                <button className="tokenpanelClosebtn" onClick={onClose}>❌</button>
            </div>

            <TokenModal onSelectToken={onSelectToken}/>

            <div className="tokenpanelFooter">
                <button className="tokenpanelFooterBtn" onClick={()=>alert("준비 중입니다.")}>
                    토큰 목록 관리
                </button>
            </div>
        </div>
    );
}

export default TokenPanel;
