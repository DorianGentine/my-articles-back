export const getBase64 = file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

export const getFormattedDate = date => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}