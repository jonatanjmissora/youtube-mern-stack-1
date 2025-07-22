const dateFormater = (date: Date) => {
  return date.toLocaleDateString("es-Es", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }

  )
}

export default dateFormater