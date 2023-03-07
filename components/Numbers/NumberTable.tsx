import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

interface TableProps {
  tableData: [
    {
      stockNumber: number;
      productCode: string;
      productLine: string;
      user: string;
      id: string;
    }
  ];
}

const NumberTable: React.FC<TableProps> = ({ tableData }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Stock Number</th>
          <th>Product Code</th>
          <th>Product Line</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((entry) => {
          return (
            <tr key={entry.id}>
              <td>{entry.stockNumber}</td>
              <td>{entry.productCode}</td>
              <td>{entry.productLine}</td>
              <td>{entry.user}</td>
              <td>
                <Link href={`/numbers/${entry.stockNumber}`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;

  tr {
    text-align: center;
  }
`;

export default NumberTable;
