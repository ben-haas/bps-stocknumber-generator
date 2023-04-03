interface NewEntryItem {
  product_code: string;
  product_line: string;
  stock_number: number;
  is_typical: boolean;
}

interface NewEntries extends Array<NewEntryItem> {}

const ParseCSV = (data: string, delimiter = ',') => {
  //remove all carriage returns from data
  data = data.replace(/\r/g, '');

  const csvData = data.split('\n').map((v: string) => v.split(delimiter));

  const headers = csvData[0];

  if (
    headers[0] !== 'product_code' ||
    headers[1] !== 'product_line' ||
    headers[2] !== 'stock_number' ||
    headers[3] !== 'is_typical'
  ) {
    return {
      status: 'error',
      message: 'Invalid CSV file. Please use the provided template.',
      entries: [],
    };
  }

  let newEntries: NewEntries = [];

  csvData.slice(1).forEach((row) => {
    if (row.length > 1) {
      newEntries.push({
        product_code: row[0],
        product_line: row[1],
        stock_number: +row[2],
        is_typical: !!row[3],
      });
    }
  });

  return {
    status: 'success',
    message: 'Data Parsed Successfully',
    entries: newEntries,
  };
};

export default ParseCSV;
