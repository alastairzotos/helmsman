import { Form } from "antd";
import { Control, Controller, ControllerRenderProps, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

export function FormItem<T extends FieldValues, Tn extends FieldPath<T>>({
  label,
  control,
  field,
  errors,
  render,
}: {
  label: string,
  control: Control<T, any>,
  field: Tn,
  errors: FieldErrors<T>,
  render: (field: ControllerRenderProps<T, Tn>) => React.ReactElement,
}) {
  return (
    <Form.Item
      label={label}
      validateStatus={errors[field] && "error"}
      help={errors[field] && errors[field]?.message as string}
    >
      <Controller
        name={field}
        control={control}
        render={({ field }) => render(field)}
      />
    </Form.Item>
  )
}