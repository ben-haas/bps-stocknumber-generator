import Card from '../UI/Card';
import styled from 'styled-components';

interface DetailProps {
  numberData: {
    stockNumber: number;
    productCode: string;
    productLine: string;
    user: string;
    createdAt: string;
    lastEdited: string;
  };
}

const NumberDetail: React.FC<DetailProps> = ({ numberData }) => {
  const createdDate: string = new Date(numberData.createdAt).toLocaleString(
    'en-US',
    { timeStyle: 'short', dateStyle: 'short' }
  );

  return (
    <DetailCard>
      <Wrapper>
        <h3>Stock Number</h3>
        <p>{numberData.stockNumber}</p>
        <h3>Product Code</h3>
        <p>{numberData.productCode}</p>
        <h3>Product Line</h3>
        <p>{numberData.productLine}</p>
        <h3>Created By</h3>
        <p>{numberData.user}</p>
        <h3>Created At</h3>
        <p>{createdDate}</p>
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

export default NumberDetail;
