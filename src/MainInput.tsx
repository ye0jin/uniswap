import "./App.css";
import { useState } from "react";

interface MainInputProps {
    value: string;
    onChange: (value: string) => void;
  }
function MainInput({ value, onChange }: MainInputProps) {
    const [inputValue, setInputValue] = useState<string>(value);
  
    // 값이 변할 때마다 호출 받음
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
  
      if (value === "") {
        // 빈 문자열
        setInputValue("");
        onChange("");
      }
  
      if (
        value.startsWith(".") || // 처음부터 소수점이거나
        (value.length > 1 && value.startsWith("0") && !value.includes(".")) // 0을 두 번 이상 입력했을 때 (근데 소수점 뒤가 아닐 경우)
      )
        return;
  
      // 숫자 + 소수점 10자리 + 단독소수점 확인
      if (/^(\d+(\.\d{0,10})?|\.)?$/.test(value)) {
        setInputValue(value); // 아닐 경우 set
        onChange(value);
      }
    };
  
    return (
      <input
        className="maininput"
        value={inputValue}
        onChange={changeValue} // 값이 변할 때마다 호출
        type="text"
        placeholder="0.0"
      />
    );
  }

  export default MainInput;