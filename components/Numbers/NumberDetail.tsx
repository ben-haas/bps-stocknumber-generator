import { useState } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import Card from '../UI/Card';
import FormStatus from './FormStatus';
import Button from '../UI/Button';

import { COLORS } from '@/styles/constants';

interface DetailProps {
  numberData: {
    stockNumber: number;
    productCode: string;
    productLine: string;
    user: string;
    createdAt: string;
    lastEdited: string;
    isTypical: boolean;
  };
  onEditNumber: (numberId: number, newNumberData: {}) => void;
}

const NumberDetail: React.FC<DetailProps> = ({ numberData, onEditNumber }) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [prodLine, setProdLine] = useState(numberData.productLine);
  const [stockNum, setStockNum] = useState(numberData.stockNumber.toString());
  const [prodCode, setProdCode] = useState(numberData.productCode);
  const [lockedPCode, setLockedPCode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState({
    pLine: true,
    pCode: true,
    form: false,
  });

  const formatDate = (date: string) => {
    const newDate = new Date(date).toLocaleString('en-US', {
      timeStyle: 'short',
      dateStyle: 'short',
    });

    return newDate;
  };

  const onEditHandler = () => {
    setIsEditing(true);
    setReadOnly(false);
  };

  const onCancelHandler = () => {
    setIsEditing(false);
    setReadOnly(true);
  };

  const onUpdateHandler = () => {
    if (!isEditing) return;
    const newData = {
      stock_number: stockNum,
      product_code: prodCode,
      product_line: prodLine,
      last_edited: new Date(),
      edited_by: session?.user?.name,
      created_at: numberData.createdAt,
      entered_by: numberData.user,
      is_typical: numberData.isTypical,
    };
    onEditNumber(numberData.stockNumber, newData);
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
    <DetailCard>
      <NumberForm>
        <Control>
          <label htmlFor="prodLine">Product Line</label>
          <NumberInput
            value={prodLine}
            id="prodLine"
            type="text"
            size={5}
            maxLength={3}
            readOnly={readOnly}
            onChange={onProdLineChangeHandler}
            valid={isValid.pLine}
          />
        </Control>
        <Control>
          <label htmlFor="stockNum">Stock Number</label>
          <NumberInput
            value={stockNum}
            id="stockNum"
            type="text"
            size={10}
            readOnly={readOnly}
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
      <Actions>
        <Button onClick={onEditHandler}>Edit</Button>
        <CancelButton show={isEditing} onClick={onCancelHandler}>
          Cancel
        </CancelButton>
        <UpdateButton show={isEditing} onClick={onUpdateHandler}>
          Update
        </UpdateButton>
      </Actions>
    </DetailCard>
  );
};

const DetailCard = styled(Card)`
  justify-content: center;
  flex-direction: column;
`;
const Actions = styled.div`
  text-align: center;
`;

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

const UpdateButton = styled(Button)<{ show: boolean }>`
  display: ${(props) => (props.show ? 'revert' : 'none')};
`;

const CancelButton = styled(Button)<{ show: boolean }>`
  display: ${(props) => (props.show ? 'revert' : 'none')};
  background-color: ${COLORS.error900};
  &:hover {
    background-color: ${COLORS.error400};
  }
`;

export default NumberDetail;
