import { Table } from '@mantine/core';

export function TableTransactions({ data }: { data: any[] }) {
  const rows = data.map((element:any) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Tx id</th>
          <th>Amount</th>
          <th>Fee</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default TableTransactions;
