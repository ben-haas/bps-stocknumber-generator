import { useState } from 'react';

import Card from '../UI/Card';
import styled from 'styled-components';
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
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: string) => {
    const newDate = new Date(date).toLocaleString('en-US', {
      timeStyle: 'short',
      dateStyle: 'short',
    });

    return newDate;
  };

  const onEditHandler = () => {
    setIsEditing(true);
  };

  const onCancelHandler = () => {
    setIsEditing(false);
  };

  const onUpdateHandler = () => {
    if (!isEditing) return;
    const newData = {
      stock_number: numberData.stockNumber,
      product_code: 'ZZZ-024437',
      product_line: 'ZZZ',
      last_edited: new Date(),
      edited_by: 'test',
      created_at: numberData.createdAt,
      entered_by: numberData.user,
      is_typical: numberData.isTypical,
    };
    onEditNumber(numberData.stockNumber, newData);
  };

  return (
    <DetailCard>
      <Wrapper>
        <h3>Product Line</h3>
        <p>{numberData.productLine}</p>
        <h3>Stock Number</h3>
        <p>{numberData.stockNumber}</p>
        <h3>Product Code</h3>
        <p>{numberData.productCode}</p>
        <h3>Created By</h3>
        <p>{numberData.user}</p>
        <h3>Created At</h3>
        <p>{formatDate(numberData.createdAt)}</p>
        <h3>Last Edited</h3>
        <p>{formatDate(numberData.lastEdited)}</p>
        <ButtonWrapper>
          <Button onClick={onEditHandler}>Edit</Button>
          <CancelButton show={isEditing} onClick={onCancelHandler}>
            Cancel
          </CancelButton>
          <UpdateButton show={isEditing} onClick={onUpdateHandler}>
            Update
          </UpdateButton>
        </ButtonWrapper>
      </Wrapper>
    </DetailCard>
  );
};

const DetailCard = styled(Card)`
  justify-content: center;
`;
const Wrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
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
