import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import Card from '../UI/Card';
import Button from '../UI/Button';
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
      <NumberForm>
        <Control>
          <label htmlFor="prodLine">Product Line</label>
          <NumberInput
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
        </Control>
        <Control>
          <label htmlFor="nextStockNum">Next Stock Number</label>
          <NumberInput
            ref={generatedStockNum}
            className={classes.notAllowed}
            id="nextStockNum"
            type="text"
            size={10}
            defaultValue="Loading..."
            readOnly
          />
        </Control>
        <Control>
          <label htmlFor="newProdCode">Product Code</label>
          <NumberInput
            ref={generatedProdCode}
            className={`${readOnly ? classes.notAllowed : ''}`}
            id="newProdCode"
            type="text"
            size={10}
            maxLength={10}
            readOnly={readOnly}
          />
          <FontAwesomeIcon icon={faClipboard} onClick={copyButtonHandler} />
        </Control>
        <Control>
          <CustomCheck
            id="customCheck"
            type="checkbox"
            onChange={checkBoxHandler}
            ref={customCheckBox}
          />
          <label htmlFor="customCheck">Custom Product Code</label>
        </Control>
        <Actions>
          <SubmitBtn onClick={submitHandler}>Add Stock Number</SubmitBtn>
        </Actions>
      </NumberForm>
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

const NumberForm = styled.form`
  position: relative;
`;

const Control = styled.div`
  margin-bottom: 1rem;

  label {
    font-weight: bold;
  }

  &:last-child {
    max-width: 15px;
  }
`;

const NumberInput = styled.input`
  font: inherit;
  padding: 0.35rem;
  border-radius: 4px;
  background-color: #f0f0f0;
  border: 1px solid #c1d1d1;
  display: block;
  font-size: 1.25rem;
  text-transform: uppercase;

  &:focus {
    background-color: #cfdaec;
    outline-color: #0d47a1;
  }

  &:invalid {
    border: 2px solid red;
  }
`;

const CustomCheck = styled.input`
  height: 16px;
  width: 16px;
  margin-right: 16px;
  vertical-align: middle;
`;

const Actions = styled.div`
  text-align: right;
`;

const SubmitBtn = styled(Button)`
  font-size: 1.25rem;
`;

export default NewNumberForm;
