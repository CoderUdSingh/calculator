import React, { useState } from "react";

const Calculator = () => {
  const [val, setVal] = useState("");
  const [op, setOp] = useState("");
  const operators = new Set(["+", "-", "/", "*"]);

  //Fucntion to evaluate the expression
  const evaluate = (expr) => new Function(`return ${expr}`)();

  const backspace = () => {
    setVal(val.slice(0, -1));
  };
  const handleButton = (e) => {
    //To handle situation if the first digit is negative
    if (val == "" && e.target.value == "-" && op == "") {
      setVal(val + e.target.value);
      console.log("minus wali ");
      setOp("filled");
      return;
    }
    //Handling situation where last character is an operator (stop accumulating operators at the end of string)
    else if (
      val != "" &&
      operators.has(e.target.value) &&
      operators.has(val[val.length - 1])
    ) {
      const newVal = val.slice(0, -1);
      setVal(newVal + e.target.value);
      return;
    } else {
      console.log("else condition is working");
      setOp("");
      setVal(val + e.target.value);
      return;
    }
  };

  return (
    <div className="calculator_boundary">
      <section className="display_box">{val}</section>

      <section id="row_1" className="keypad">
        <input type="button" value="C" onClick={() => setVal("")} />
        <input type="button" value="del" onClick={backspace} />
        <input type="button" value="." onClick={handleButton} />
        <input type="button" value="/" onClick={handleButton} />
      </section>

      <section id="row_2" className="keypad">
        <input type="button" value="7" onClick={handleButton} />
        <input type="button" value="8" onClick={handleButton} />
        <input type="button" value="9" onClick={handleButton} />
        <input
          type="button"
          value="x"
          onClick={(e) => handleButton({ target: { value: "*" } })}
        />
      </section>

      <section id="row_3" className="keypad">
        <input type="button" value="4" onClick={handleButton} />
        <input type="button" value="5" onClick={handleButton} />
        <input type="button" value="6" onClick={handleButton} />
        <input type="button" value="-" onClick={handleButton} />
      </section>

      <section id="row_4" className="keypad">
        <input type="button" value="1" onClick={handleButton} />
        <input type="button" value="2" onClick={handleButton} />
        <input type="button" value="3" onClick={handleButton} />
        <input type="button" value="+" onClick={handleButton} />
      </section>

      <section id="row_5" className="keypad">
        <input type="button" value="0" onClick={handleButton} />
        <input
          type="button"
          value="="
          onClick={() => {
            try {
              const result = evaluate(val);
              const roundedResult = parseFloat(result.toFixed(6));
              setVal(roundedResult.toString());
            } catch (error) {
              setVal("Error");
            }
          }}
        />
      </section>
    </div>
  );
};

export default Calculator;
