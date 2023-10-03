const TableRow = ({ obj }) => {
  return (
    <>
      <tr>
        {
          Object.values(obj).map((item, index) => {
            return (
              <td key={index}>{item}</td>
            )
          })
        }
      </tr>
    </>
  )
}

export default TableRow;