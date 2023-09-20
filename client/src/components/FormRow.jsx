import { Input } from "../Styles/Styles"

const FormRow = ({ type, name, labelText, defaultValue = "" }) => {
  return (
    <Input
      type={type}
      name={name}
      id={name}
      defaultValue={defaultValue}
      placeholder={labelText}
      required
    />
  )
}

export default FormRow
