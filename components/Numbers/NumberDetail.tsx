const NumberDetail: React.FC<{
  numberData: {
    id: string;
    stockNumber: number;
    productCode: string;
    productLine: string;
    user: string;
  };
}> = (props) => {
  return <div>{JSON.stringify(props.numberData)}</div>;
};

export default NumberDetail;
