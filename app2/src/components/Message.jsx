const Message = ({count}) => {
  const isValid = () => {
    return ((count > 100 && count < 200) || (count > 0 && count < 50))
  }

  const formatNumber = () => {
    if (count > 100 && count < 200) {
      return 'Hai superato 100!'
    } else if (count > 0 && count < 50) {
      return 'Hai superato 50!'
    }
  }

  return (
    <>
      {
        isValid() && (
          <p>{formatNumber()}</p>
        )
      }
    </>
  )
}

export default Message;