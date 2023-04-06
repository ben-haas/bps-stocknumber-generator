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
  const [isValid, setIsValid] = useState({
    pLine: true,
    pCode: true,
    form: false,
  });

  useEffect(() => {
    if (nextStockNumber != 0) {
      setStockNum(nextStockNumber.toString());
    }

    setReadOnly(!lockedPCode);
  }, [nextStockNumber, lockedPCode]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid.pCode && isValid.pLine) {
      const stockNumber = stockNum;
      const productCode = prodCode;
      const enteredProductLine = prodLine;
      let typical = !lockedPCode;
      const user = session?.user!.name;

      if (prodCode === `${prodLine}-0${stockNum}` && lockedPCode) {
        typical = true;
      }

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
      setLockedPCode(false);
      setIsValid({ pLine: true, pCode: true, form: false });
      setSubmitted(true);
    }
  };

  const onProdLineChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdLine(e.target.value.toUpperCase());
    if (e.target.value.toUpperCase().match('[A-Z]{3}') === null) {
      setIsValid({ ...isValid, pLine: false, form: false });
      setProdCode('');
      return;
    }
    setSubmitted(false);

    setProdCode(`${e.target.value.toUpperCase()}-0${stockNum}`);
    setIsValid({ pLine: true, pCode: true, form: true });
  };

  const pCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdCode(e.target.value.toUpperCase());
    if (e.target.value.toUpperCase().match('[A-Z]{3}[-][0-9]{6}') === null) {
      setIsValid({ ...isValid, pCode: false });
      return;
    }

    if (e.target.value.toUpperCase().substring(0, 3) != prodLine) {
      setIsValid({ ...isValid, pCode: false });
      return;
    }
    setIsValid({ ...isValid, pCode: true });
  };

  const copyButtonHandler = () => {
    navigator.clipboard.writeText(prodCode);
  };

  const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lockedPCode && !e.target.checked && prodLine != '') {
      setProdCode(`${prodLine}-0${stockNum}`);
      setIsValid({ ...isValid, pCode: true });
    }

    if (lockedPCode && !e.target.checked && prodLine === '') {
      setProdCode('');
      setIsValid({ ...isValid, pCode: true });
    }

    setLockedPCode(e.target.checked);
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
            onChange={onProdLineChangeHandler}
            valid={isValid.pLine}
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
            valid={true}
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
              valid={isValid.pCode}
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
        <FormStatus postStatus={postStatus} submitted={submitted} />
      </StatusContainer>
      <Actions>
        <SubmitBtn onClick={submitHandler} valid={isValid.form}>
          Add Stock Number
        </SubmitBtn>
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

const NumberInput = styled.input<{ valid: boolean }>`
  padding: 0.35rem;
  border-radius: 4px;
  background-color: ${(p) => (p.valid ? COLORS.blueGray50 : COLORS.error100)};
  border: 1px solid ${(p) => (p.valid ? COLORS.blueGray50 : COLORS.error900)};
  display: block;
  font-size: 1.25rem;
  text-transform: uppercase;
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

const SubmitBtn = styled(Button)<{ valid: boolean }>`
  font-size: 1.25rem;
  background-color: ${(p) => (p.valid ? COLORS.primary : COLORS.blueGray50)};
  color: ${(p) => (p.valid ? 'white' : 'gray')};
  cursor: ${(p) => (p.valid ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${(p) =>
      p.valid ? COLORS.secondary : COLORS.blueGray50};
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 400px;
  justify-content: center;
  font-weight: bold;
`;

export default NewNumberForm;
