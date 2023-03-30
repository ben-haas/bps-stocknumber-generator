const ParseCSV = (data: string, delimiter = ',') => {
  //remove all carriage returns from data
  data = data.replace(/\r/g, '');

  const csvData = data.split('\n').map((v: string) => v.split(delimiter));

  const headers = csvData[0];
  // if headers do not equal product_code, product_line, stock_number, is_typical then throw error
  if (
    headers[0] !== 'product_code' ||
    headers[1] !== 'product_line' ||
    headers[2] !== 'stock_number' ||
    headers[3] !== 'is_typical'
  ) {
    return { error: 'Invalid CSV file. Please use the provided template.' };
  }

  let newEntries: {
    product_code: string;
    product_line: string;
    stock_number: number;
    is_typical: boolean;
  }[] = [];

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

  return { entries: newEntries };
};

export default ParseCSV;
