import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import Card from '../UI/Card';
import Button from '../UI/Button';
import FormStatus from './FormStatus';
import { COLORS } from '@/styles/constants';

interface FormProps {
  nextStockNumber: number;
  postStatus: { success: boolean; message: string };
  onAddNumber: (numberData: {}) => void;
}

const NewNumberForm: React.FC<FormProps> = ({
  nextStockNumber,
  postStatus,
  onAddNumber,
}) => {
  const { data: session } = useSession();
  const [readOnly, setReadOnly] = useState(true);
  const [prodLine, setProdLine] = useState('');
  const [stockNum, setStockNum] = useState('Loading...');
  const [prodCode, setProdCode] = useState('');
  const [lockedPCode, setLockedPCode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (nextStockNumber != 0) {
      setStockNum(nextStockNumber.toString());
    }

    if (prodLine.length === 3 && stockNum) {
      setProdCode(`${prodLine.toUpperCase()}-0${stockNum}`);
    } else {
      setProdCode('');
    }

    setReadOnly(!lockedPCode);
  }, [nextStockNumber, prodLine, stockNum, lockedPCode]);

  const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLockedPCode(e.target.checked);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const stockNumber = stockNum;
    const productCode = prodCode;
    const enteredProductLine = prodLine.toUpperCase();
    const typical = !lockedPCode;
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

    onAddNumber(numberData);

    setProdLine('');
    setProdCode('');
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  };

  const onProdLineChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdLine(e.target.value);
  };

  const pCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdCode(e.target.value);
  };

  const copyButtonHandler = () => {
    navigator.clipboard.writeText(prodCode);
  };

  return (
    <Card>
      <NumberForm>
        <Control>
          <label htmlFor="prodLine">Product Line</label>
          <NumberInput
            value={prodLine}
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
            value={stockNum}
            style={{ cursor: 'not-allowed' }}
            id="nextStockNum"
            type="text"
            size={10}
            readOnly
          />
        </Control>
        <Control>
          <label htmlFor="newProdCode">Product Code</label>
          <InputWrapper>
            <NumberInput
              value={prodCode}
              onChange={pCodeChangeHandler}
              id="newProdCode"
              style={{ cursor: readOnly ? 'not-allowed' : 'text' }}
              type="text"
              size={12}
              maxLength={10}
              readOnly={readOnly}
            />
            <Clipboard icon={faClipboard} onClick={copyButtonHandler} />
          </InputWrapper>
        </Control>
        <Control>
          <CustomCheck
            id="customCheck"
            type="checkbox"
            checked={lockedPCode}
            onChange={checkBoxHandler}
          />
          <label htmlFor="customCheck">Custom Product Code</label>
        </Control>
      </NumberForm>
      <StatusContainer>
        <FormStatus status={postStatus} submitted={submitted} />
      </StatusContainer>
      <Actions>
        <SubmitBtn onClick={submitHandler}>Add Stock Number</SubmitBtn>
      </Actions>
    </Card>
  );
};

const NumberForm = styled.form`
  position: flex;
`;

const Control = styled.div`
  margin-bottom: 1rem;

  label {
    font-weight: bold;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: max-content;
`;

const NumberInput = styled.input`
  padding: 0.35rem;
  border-radius: 4px;
  background-color: ${COLORS.blueGray50};
  border: 1px solid ${COLORS.blueGray50};
  display: block;
  font-size: 1.25rem;
  text-transform: uppercase;

  &:focus {
    background-color: ${COLORS.secondary_light};
    outline-color: ${COLORS.primary};
  }

  &:invalid {
    background-color: ${COLORS.error100};
    outline-color: ${COLORS.error900};
  }
`;

const Clipboard = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  font-size: 1.25rem;
  cursor: pointer;
`;

const CustomCheck = styled.input`
  height: 16px;
  width: 16px;
  margin-right: 16px;
  vertical-align: middle;
`;

const Actions = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const SubmitBtn = styled(Button)`
  font-size: 1.25rem;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 400px;
  justify-content: center;
  font-weight: bold;
`;

export default NewNumberForm;
