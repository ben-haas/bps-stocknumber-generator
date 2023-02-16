import { useRef, useState } from 'react';

import Card from '../UI/Card';
import classes from './NewNumberForm.module.css';

const NewNumberForm = () => {
  const [stockNum, setStockNum] = useState(null);
  const [readOnly, setReadOnly] = useState(true);
  const enteredProdLine = useRef<HTMLInputElement>(null);
  const generatedStockNum = useRef<HTMLInputElement>(null);
  const generatedProdCode = useRef<HTMLInputElement>(null);
  const customCheckBox = useRef<HTMLInputElement>(null);

  const checkBoxHandler = () => {
    setReadOnly(!customCheckBox.current!.checked);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onProdLineChangeHandler = () => {
    if (
      enteredProdLine.current!.value.length === 3 &&
      generatedStockNum.current!.value
    ) {
      generatedProdCode.current!.value = `${enteredProdLine.current!.value.toUpperCase()}-0${
        generatedStockNum.current!.value
      }`;
    } else {
      generatedProdCode.current!.value = '';
    }
  };

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="prodLine">Product Line</label>
          <input
            ref={enteredProdLine}
            id="prodLine"
            type="text"
            size={3}
            maxLength={3}
            pattern="[a-z]{3,3}"
            title="Exactly 3 Letters"
            onChange={onProdLineChangeHandler}
            required
          />
        </div>
        <div className={`${classes.control} ${classes.notAllowed}`}>
          <label htmlFor="nextStockNum">Next Stock Number</label>
          <input
            ref={generatedStockNum}
            className={classes.notAllowed}
            id="nextStockNum"
            type="text"
            size={10}
            defaultValue={stockNum!}
            readOnly
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="newProdCode">Product Code</label>
          <input
            ref={generatedProdCode}
            id="newProdCode"
            type="text"
            size={20}
            readOnly={readOnly}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="customCheck">Custom Product Code</label>
          <input
            id="customCheck"
            type="checkbox"
            onChange={checkBoxHandler}
            ref={customCheckBox}
          />
        </div>
        <div className={classes.actions}>
          <button className="btn" onClick={submitHandler}>
            Add Stock Number
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewNumberForm;
