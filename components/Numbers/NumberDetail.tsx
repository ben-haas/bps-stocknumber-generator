import Card from '../UI/Card';
import classes from './NumberDetail.module.css';

const NumberDetail: React.FC<{
  numberData: {
    stockNumber: number;
    productCode: string;
    productLine: string;
    user: string;
    createdAt: string;
    lastEdited: string;
  };
}> = (props) => {
  const createdDate: string = new Date(
    props.numberData.createdAt
  ).toLocaleString('en-US', { timeStyle: 'short', dateStyle: 'short' });

  return (
    <Card>
      <div className={classes.details}>
        <h3>Stock Number</h3>
        <p>{props.numberData.stockNumber}</p>
        <h3>Product Code</h3>
        <p>{props.numberData.productCode}</p>
        <h3>Product Line</h3>
        <p>{props.numberData.productLine}</p>
        <h3>Created By</h3>
        <p>{props.numberData.user}</p>
        <h3>Created At</h3>
        <p>{createdDate}</p>
      </div>
    </Card>
  );
};

export default NumberDetail;
