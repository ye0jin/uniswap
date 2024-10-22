import React from "react";

interface TokenPanelProps {
    isOpen: boolean;
    onClose: () => void; // 패널을 닫는 함수 추가
}

const TokenPanel: React.FC<TokenPanelProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="tokenpanel">
            <div className="tokenpanelHeader">
                <h4>토큰 선택</h4>
                <button className="tokenpanelClosebtn" onClick={onClose}>❌</button>
            </div>
        </div>
    );
}

export default TokenPanel;
