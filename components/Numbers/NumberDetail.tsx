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
  };
  onEditNumber: (numberId: number) => void;
}

const NumberDetail: React.FC<DetailProps> = ({ numberData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const createdDate: string = new Date(numberData.createdAt).toLocaleString(
    'en-US',
    { timeStyle: 'short', dateStyle: 'short' }
  );

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
        <p>{createdDate}</p>
        <ButtonWrapper>
          <Button>Edit</Button>
          <CancelButton show={isEditing}>Cancel</CancelButton>
          <UpdateButton show={isEditing}>Update</UpdateButton>
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
