import { Cell, Column, Row, TableBody, TableHeader, TableView } from "@adobe/react-spectrum";

interface Props {
  tableItems: any;
}

const SummaryTable = (props: Props) => {
  const { tableItems } = props;
  return (
    <TableView
      aria-label="Summary Table of answers"
      width={'95%'}
    >
      <TableHeader columns={[
        {
          name: '#',
          uid: 'question_number',
          width: 10
        },
        {
          name: 'Question',
          uid: 'question'
        }, {
          name: 'Answer',
          uid: 'answer'
        }
      ]}>
        {column => (
          <Column
            key={column.uid}
            align={column.uid === 'date' ? 'end' : 'start'}
            width={column.width || null}
          >
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody
        items={tableItems}
      >
        {(item: any) => {
          return (
            <Row key={JSON.stringify(item)}>
              {columnKey => <Cell>{item[columnKey]}</Cell>}
            </Row>
          )
        }}
      </TableBody>
    </TableView>
  );
}

export default SummaryTable;