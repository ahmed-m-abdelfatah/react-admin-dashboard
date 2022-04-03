import './table.scss';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { rows } from '../../homeTableSource.js';

const TableList = () => {
  console.log('~ TableList');

  return (
    <Table className='table'>
      <TableHead>
        <TableRow>
          <TableCell className='tableCell'>Tracking ID</TableCell>
          <TableCell className='tableCell'>Product</TableCell>
          <TableCell className='tableCell'>Customer</TableCell>
          <TableCell className='tableCell'>Date</TableCell>
          <TableCell className='tableCell'>Amount</TableCell>
          <TableCell className='tableCell'>Payment Method</TableCell>
          <TableCell className='tableCell'>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell className='tableCell'>{row.id}</TableCell>
            <TableCell className='tableCell'>
              <div className='cellWrapper'>
                <img src={row.img} alt='' className='image' />
                {row.product}
              </div>
            </TableCell>
            <TableCell className='tableCell'>{row.customer}</TableCell>
            <TableCell className='tableCell'>{row.date}</TableCell>
            <TableCell className='tableCell'>{row.amount}</TableCell>
            <TableCell className='tableCell'>{row.method}</TableCell>
            <TableCell className='tableCell'>
              <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableList;
