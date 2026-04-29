import { Checkbox, DatePicker, Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item
            label={type === "checkbox" ? "" : label}
            style={{ marginBottom: 0 }}
          >
            {type === "date" ? (
              <DatePicker
                style={{
                  width: "100%",
                }}
                {...field}
                size="large"
                name="estimatedDeliveryDate"
                placeholder={label}
              />
            ) : (
              <>
                {" "}
                {type === "checkbox" && (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    disabled={disabled}
                  >
                    {label}
                  </Checkbox>
                )}
                {(name === "description" || name === "photoURL") && (
                  <Input.TextArea
                    style={{
                      height: 96,
                    }}
                    {...field}
                    id={name}
                    size="large"
                    disabled={disabled}
                    placeholder={label}
                  />
                )}
                {name !== "inStock" &&
                  name !== "description" &&
                  name !== "photoURL" && (
                    <Input
                      {...field}
                      type={type}
                      id={name}
                      size="large"
                      disabled={disabled}
                      placeholder={label}
                    />
                  )}
              </>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;

// before setings controller
/**
import { useFormContext } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  const { register } = useFormContext();

  return (
    <>
      {label ? label : null}
      <input type={type} id={name} {...register(name)} />
    </>
  );
};

export default PHInput;

 * 
 * */
