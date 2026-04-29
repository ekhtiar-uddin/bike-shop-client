import { Button, Col, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { categoriesOptions } from "../../../constants/global";
import { useAddProductMutation } from "../../../redux/features/admin/productManagement.api";
import { TResponse } from "../../../types";

const CreateBike = () => {
  const [addProduct] = useAddProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating... ");

    const category = data?.category
      ?.toLowerCase()
      .replace(/^./, (c: string) => c.toUpperCase());

    const bikeData = {
      name: data.name,
      brand: data.brand,
      model: data.model,
      price: Number(data.price),
      description: data.description,
      category: category,
      inStock: data.inStock,
      quantity: Number(data.quantity),
      photoURL: data.photoURL,
    };

    console.log("createbike", bikeData);

    try {
      const res = (await addProduct(bikeData)) as TResponse<unknown>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Bike Created", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">
          Create Bike
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new bike product with pricing, inventory, and category details.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 md:p-6">
        <Flex justify="center" align="top">
          <Col span={24}>
            <PHForm onSubmit={onSubmit}>
              {/* First Row */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <PHInput type="text" label="Name" name="name" />
                </Col>
                <Col xs={24} md={8}>
                  <PHInput type="text" label="Brand" name="brand" />
                </Col>
                <Col xs={24} md={8}>
                  <PHInput type="text" label="Model" name="model" />
                </Col>
              </Row>

              {/* Second Row */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <PHInput type="number" label="Price" name="price" />
                </Col>
                <Col xs={24} md={8}>
                  <PHInput type="number" label="Quantity" name="quantity" />
                </Col>
                <Col xs={24} md={8}>
                  <PHSelect
                    label="Category"
                    name="category"
                    options={categoriesOptions}
                  />
                </Col>
              </Row>

              {/* Third Row */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <PHInput type="text" label="Description" name="description" />
                </Col>

                <Col xs={24} md={12}>
                  <PHInput type="text" label="Photo URL" name="photoURL" />
                </Col>
              </Row>

              <div className="mt-2">
                <PHInput label="Availability" name="inStock" type="checkbox" />
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="primary" size="large" htmlType="submit">
                  Create Bike
                </Button>
              </div>
            </PHForm>
          </Col>
        </Flex>
      </div>
    </div>
  );
};

export default CreateBike;
