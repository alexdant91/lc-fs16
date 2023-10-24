export const TableRow = ({ obj }) => {
  return (
    <>
      {Object.values(obj).map((item, index) => {
        return (
          <td key={index}>{typeof item === "object" ? item.username : item}</td>
        );
      })}
    </>
  );
};
