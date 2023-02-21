import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import classes from './NumberTable.module.css';

const NumberTable: React.FC<{
  tableData: [
    {
      stockNumber: number;
      productCode: string;
      productLine: string;
      user: string;
      id: string;
    }
  ];
}> = (props) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Stock Number</th>
          <th>Product Code</th>
          <th>Product Line</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((entry) => {
          return (
            <tr key={entry.id}>
              <td>{entry.stockNumber}</td>
              <td>{entry.productCode}</td>
              <td>{entry.productLine}</td>
              <td>{entry.user}</td>
              <td>
                <Link href={`/${entry.id}`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NumberTable;
