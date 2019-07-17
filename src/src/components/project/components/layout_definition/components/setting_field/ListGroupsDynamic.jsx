import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper'
import { EFFECT_TITLE_SHORT } from './dynamic_fields/constant'
const styles = theme => ({
   table: {
      minWidth: 400,
   },
   listRule: {
      listStyle: 'none',
      padding: 0,
   },
});

const ListGroupsDynamic = (props) => {
   const {
      groups = [],
      classes,
      onDeleteItem = () =>()=> null,
      onClickItem = () =>()=> null
   } = props;
   return (
      <Paper>
         <Table className={classes.table}>
            <TableHead>
               <TableRow>
                  <TableCell>GroupID</TableCell>
                  <TableCell align="left">Rules</TableCell>
                  <TableCell align="left">Action</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {groups.map((row, rowId) => (
                  <TableRow key={rowId}>
                     <TableCell component="th" scope="row">
                        {rowId + 1}
                     </TableCell>
                     <TableCell align="left">
                        <ul className={classes.listRule}>
                           {row.map((item ,itemId)=> {
                              return (
                                 <li  key={itemId} className='item-rule'>
                                    <span>{item.section}</span>-
                                 <span>{item.field}</span>;
                                 <span>{EFFECT_TITLE_SHORT[item.rule]}</span>:
                                 <span>{item.value}</span>
                                 </li>
                              )
                           })}
                        </ul>
                     </TableCell>
                     <TableCell component="th" scope="row">
                        <IconButton color="primary" aria-label="Edit" onClick={onClickItem(rowId)}>
                           <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="secondary" aria-label="Delete" onClick={onDeleteItem(rowId)}>
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </Paper>
   )
}

export default React.memo(withStyles(styles)(ListGroupsDynamic));
