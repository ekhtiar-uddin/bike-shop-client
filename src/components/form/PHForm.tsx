import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  // const { register, reset, handleSubmit } = methods {methods is an object containg all function }
  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={methods.handleSubmit(onSubmit)}
        style={{
          width: "100%",
        }}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
