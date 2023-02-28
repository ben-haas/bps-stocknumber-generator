import { useRef, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import Card from '../UI/Card';
import classes from './NewNumberForm.module.css';

const NewNumberForm: React.FC<{
  nextStockNumber: number;
  postStatus: { success: boolean; message: string };
  onAddNumber: (numberData: {}) => void;
}> = (props) => {
  const { data: session } = useSession();
  const [statusVisible, setStatusVisible] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const enteredProdLine = useRef<HTMLInputElement>(null);
  const generatedStockNum = useRef<HTMLInputElement>(null);
  const generatedProdCode = useRef<HTMLInputElement>(null);
  const customCheckBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.nextStockNumber != 0) {
      generatedStockNum.current!.value = props.nextStockNumber.toString();
    }
  }, [props.nextStockNumber]);

  const checkBoxHandler = () => {
    setReadOnly(!customCheckBox.current!.checked);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const stockNumber = generatedStockNum.current!.value;
    const productCode = generatedProdCode.current!.value;
    const enteredProductLine = enteredProdLine.current!.value.toUpperCase();
    const typical = !customCheckBox.current!.checked;
    const user = session?.user!.name;

    const numberData = {
      stock_number: +stockNumber,
      product_code: productCode,
      product_line: enteredProductLine,
      is_typical: typical,
      entered_by: user,
      created_at: new Date(),
      edited_by: user,
      last_edited: new Date(),
    };

    props.onAddNumber(numberData);

    enteredProdLine.current!.value = '';
    generatedProdCode.current!.value = '';

    setStatusVisible(true);

    setTimeout(() => {
      setStatusVisible(false);
    }, 5000);
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

  const copyButtonHandler = () => {
    navigator.clipboard.writeText(generatedProdCode.current!.value);
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
            size={5}
            maxLength={3}
            pattern="[a-z]{3,3}"
            title="Exactly 3 Letters"
            onChange={onProdLineChangeHandler}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="nextStockNum">Next Stock Number</label>
          <input
            ref={generatedStockNum}
            className={classes.notAllowed}
            id="nextStockNum"
            type="text"
            size={10}
            defaultValue="Loading..."
            readOnly
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="newProdCode">Product Code</label>
          <input
            ref={generatedProdCode}
            className={`${readOnly ? classes.notAllowed : ''} ${
              classes.productCode
            }`}
            id="newProdCode"
            type="text"
            size={10}
            maxLength={10}
            readOnly={readOnly}
          />
          <span
            className={classes.copyBtn}
            onClick={copyButtonHandler}
            title="copy"
          >
            <FontAwesomeIcon icon={faClipboard} />
          </span>
        </div>
        <div className={classes.checkbox}>
          <input
            id="customCheck"
            type="checkbox"
            onChange={checkBoxHandler}
            ref={customCheckBox}
          />
          <label htmlFor="customCheck">Custom Product Code</label>
        </div>
        <div className={classes.actions}>
          <button className="btn" onClick={submitHandler}>
            Add Stock Number
          </button>
        </div>
      </form>
      {statusVisible && (
        <div
          className={`${classes.statusContainer} ${
            props.postStatus.success ? classes.success : classes.error
          }`}
        >
          {props.postStatus.message}
        </div>
      )}
    </Card>
  );
};

export default NewNumberForm;
