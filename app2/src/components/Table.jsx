import TableRow from "./TableRow";

const Table = ({data}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {
              Object.keys(data[0]).map(item => {
                return (
                  <th>{item}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => {
              return (
                <TableRow key={item.id} obj={item}/>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Table;