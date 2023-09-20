import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [number, SetNumber] = useState(false);
  const [symbol, SetSymbol] = useState(false);
  const [length, setLength] = useState(6);
  const [text, setText] = useState("");
// use ref hook
const passRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = "";

    // let random;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // let char = "!@#$%^&*()_+[]{}";
    // let num = "0123456789";
    if (number)
      str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (symbol)
      str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}";
    if (number && symbol)
      str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}0123456789";

    for (let i = 1; i <= length; i++) {
      // const randomChar = str[Math.floor(Math.random() * str.length)];
      const randomChar = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomChar);
    }
    setText(pass)
  }, [number, symbol, length, setText]);

  const copyPassOnClip = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(text)
    }, [text])

  useEffect(()=>{passGen()}, [length, symbol, number, passGen])

  return (
    <>
      <div className="w-full max-w-md bg-slate-600 rounded-md root mt-10 justify-center p-10 flex-1">
        <h1 className="text-center text-lg text-cyan-50">Password Genaretor</h1>
        <div className="flex mb-6 mt-4">
          <input type="text" className="w-full max-w-md" readOnly value={text} ref={passRef}/>
          <button className="bg-blue-400 w-20" onClick={copyPassOnClip}>Copy</button>
        </div>
        <div className="flex gap-3">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="w-20"
          />
          <h4>Length: {length}</h4>
          <input type="checkbox" defaultChecked={number} onChange={()=> {SetNumber((prev)=>!prev )}} />
          <h3>Number</h3>
          <input type="checkbox" defaultChecked={symbol} onChange={()=> {SetSymbol((prev)=>!prev )}}/>
          <h3>Charecter</h3>
        </div>
      </div>
    </>
  );
}

export default App;
