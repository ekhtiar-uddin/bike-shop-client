import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  defaultValue?: string;
};

const PHSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  defaultValue,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            defaultValue={defaultValue || ""}
            //  {...field} this works all like onChange={field.onChange}
            options={options}
            size="large"
            disabled={disabled}
            placeholder={label}
            getPopupContainer={(triggerNode) =>
              triggerNode?.parentElement || document.body
            }
            listHeight={240}
            dropdownStyle={{ maxHeight: 240, overflow: "auto" }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
