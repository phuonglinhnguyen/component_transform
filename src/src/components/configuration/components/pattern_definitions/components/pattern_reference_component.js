import React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const example_regular_expression = [
  {
    pattern: '^[0-9]+$ Hoặc ^[\\d]+$',
    description: 'Kiểm tra chuỗi có phải là số hay không',
    result: '1234 -> true , 12a3 -> false'
  },
  {
    pattern: '^[a-zA-Z]+$ Hoặc ^[\\D]+$',
    description: 'Kiểm tra chuỗi có phải là chữ hay không',
    result: 'asv -> true , aA1z -> false'
  },
  {
    pattern: '^[a-z]+$',
    description: 'Kiểm tra chuỗi có phải là chữ thường hay không',
    result: 'asv -> true , aAz -> false'
  },
  {
    pattern: '^[A-Z]+$',
    description: 'Kiểm tra chuỗi có phải là chữ hoa hay không',
    result: 'ASV -> true , aAz -> false'
  },
  {
    pattern: '^[a-zA-Z0-9]+$ Hoặc ^[\\w]+$',
    description: 'Kiểm tra chuỗi có phải là chữ hoặc số (a-z A-Z 0-9)',
    result: 'asv -> true , as!@$ -> false'
  },
  {
    pattern: '^[^a-zA-Z0-9]+$ Hoặc ^[\\W]+$',
    description: 'Kiểm tra chuỗi không phải là chữ hoặc số (!@%$^*)',
    result: '!@$!# -> true , as!@$ -> false'
  },
  {
    pattern: '^[0-9]{1,2}/[0-9]{1,2}/[0-9]{1,4}$',
    description: 'Kiểm tra chuỗi phải là dạng ngay/thang/nam hay không',
    result: '12/01/1994 -> true ; 12/3/ -> false '
  },
  {
    pattern: '^(ABC)|(CDF)$',
    description: 'Kiểm tra chuỗi là chuỗi A hoặc chuỗi B',
    result: 'ABCa -> true ;aCDF -> true ; aABC -> false;CDFa -> false'
  }
];

const PatternReference = () => {
  return (
    <Table fixedFooter={false} selectable={false}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn>Pattern</TableHeaderColumn>
          <TableHeaderColumn>Description</TableHeaderColumn>
          <TableHeaderColumn>E.g.</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {example_regular_expression.map((row, index) =>
          <TableRow key={index}>
            <TableRowColumn>
              {row.pattern}
            </TableRowColumn>
            <TableRowColumn>
              {row.description}
            </TableRowColumn>
            <TableRowColumn>
              {row.result}
            </TableRowColumn>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PatternReference;
