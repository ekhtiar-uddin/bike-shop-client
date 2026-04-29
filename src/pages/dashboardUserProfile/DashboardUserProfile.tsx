import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Col, Flex } from "antd";
import axios from "axios";
import { Edit } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import Modal from "../../components/ui/pages/checkout/modal/Modal";
import { useGetOrdersQuery } from "../../redux/features/admin/orderManagement.api";
import { useUpdateUserProfileMutation } from "../../redux/features/admin/userManagement.api";
import {
  selectCurrentUser,
  setUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TOrdersData } from "../../types/orderManagement.type";
import Chart from "../overviewDashboard/chart/Chart";
import List from "../overviewDashboard/table/Table";
import "./DashboardUserProfile.scss";

const DashboardUserProfile = () => {
  const [userId, setUserId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [file, setFile] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);

  const { isLoading: orderIsLoading, data: orders } = useGetOrdersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [updateUserProfile] = useUpdateUserProfileMutation();

  if (orderIsLoading) {
    return <div className="loader">Loading...</div>;
  }

  const orderData: TOrdersData[] = orders?.data?.ordersData;
  const revenueData = orders?.data?.revenueData;

  const customerLastOrders =
    orders?.data?.ordersData
      ?.filter((item) => item?.user?._id === user?._id)
      .slice(-4) || [];

  const customerExpenseData = orders?.data?.customerExpenseData;

  const expenseData = customerExpenseData?.find(
    (item) => item.userId === user._id,
  );

  const handleUpdateProfileModal = (userId) => {
    setOpenEdit(true);
    setUserId(userId);
  };

  const defaultValues = {
    ...user,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    setOpenEdit(false);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");

    try {
      let imageUrl = "";
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dofbykuhh/image/upload",
          formData,
        );
        imageUrl = uploadRes.data.url;
      }

      console.log(imageUrl);

      const updateData = {
        id: userId,
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          country: data.country,
          img: imageUrl || user?.img,
        },
      };

      const res = await updateUserProfile(updateData).unwrap();
      console.log(res);
      dispatch(setUser({ user: res.data, token: token }));
      toast.success("Updated", { id: toastId, duration: 2000 });
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return user?.role === "customer" ? (
    <div className="single ">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div
              onClick={() => handleUpdateProfileModal(user?._id)}
              className="editButton"
            >
              Edit
            </div>

            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
              <div className=" ">
                <div className="flex gap-2 my-3 w-[600px]">
                  <h3 className="text-lg font-black text-gray-800">
                    Update Profile
                  </h3>
                  <Edit size={26} className=" text-red-500" />
                </div>

                <Flex justify="center" align="center">
                  <Col span={24}>
                    {" "}
                    {/* Expand to full width */}
                    <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                      <div className="flex items-center justify-center gap-5">
                        <div className="w-[100px]">
                          <img
                            className="rounded-full"
                            src={
                              file
                                ? URL.createObjectURL(file)
                                : user?.img ||
                                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="cursor-pointer formInput border border-b1 p-1">
                          <label htmlFor="file" className="cursor-pointer">
                            Image:{" "}
                            <DriveFolderUploadOutlinedIcon className="icon" />
                          </label>
                          <input
                            className="cursor-pointer"
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            hidden
                          />
                        </div>
                      </div>
                      <PHInput type="text" name="name" label="Full Name:" />
                      <PHInput type="email" name="email" label="Email:" />
                      <PHInput type="text" name="phone" label="Phone:" />
                      <PHInput type="text" name="city" label="City:" />
                      <PHInput type="text" name="country" label="Country:" />

                      <div className="flex justify-center gap-4">
                        <button type="submit" className="btn btn-light px-7">
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-light px-7"
                          onClick={() => setOpenEdit(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </PHForm>
                  </Col>
                </Flex>
              </div>
            </Modal>

            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user?.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+{user?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {user?.city}. {user?.country}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{user?.country}</span>
                </div>
              </div>
            </div>

            <Link to="/change-password">
              <div className="cursor-pointer bg-[#e9e6f5] max-w-max  text-[#9651f8] text-center py-3 px-2 mt-5 ">
                Update Password
              </div>
            </Link>
          </div>
          <div className="right">
            <Chart
              revenueData={expenseData?.expenseData}
              aspect={4 / 1}
              title="Your Expenses ( Last 6 Months)"
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Your Last Transactions</h1>
          <List orderIsLoading={orderIsLoading} orders={customerLastOrders} />
        </div>
      </div>
    </div>
  ) : (
    <div className="single ">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div
              onClick={() => handleUpdateProfileModal(user?._id)}
              className="editButton"
            >
              Edit
            </div>

            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
              <div className=" ">
                <div className="flex gap-2 my-3 w-[600px]">
                  <h3 className="text-lg font-black text-gray-800">
                    Update Profile
                  </h3>
                  <Edit size={26} className=" text-red-500" />
                </div>

                <Flex justify="center" align="center">
                  <Col span={24}>
                    {" "}
                    {/* Expand to full width */}
                    <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                      <div className="flex items-center justify-center gap-5">
                        <div className="w-[100px]">
                          <img
                            className="rounded-full"
                            src={
                              file
                                ? URL.createObjectURL(file)
                                : user?.img ||
                                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="cursor-pointer formInput border border-b1 p-1">
                          <label htmlFor="file" className="cursor-pointer">
                            Image:{" "}
                            <DriveFolderUploadOutlinedIcon className="icon" />
                          </label>
                          <input
                            className="cursor-pointer"
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            hidden
                          />
                        </div>
                      </div>
                      <PHInput type="text" name="name" label="Full Name:" />
                      <PHInput type="email" name="email" label="Email:" />
                      <PHInput type="text" name="phone" label="Phone:" />
                      <PHInput type="text" name="city" label="City:" />
                      <PHInput type="text" name="country" label="Country:" />

                      <div className="flex justify-center gap-4">
                        <button type="submit" className="btn btn-light px-7">
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-light px-7"
                          onClick={() => setOpenEdit(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </PHForm>
                  </Col>
                </Flex>
              </div>
            </Modal>

            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user?.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+{user?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {user?.city}. {user?.country}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{user?.country}</span>
                </div>
              </div>
            </div>

            <Link to="/change-password">
              <div className="cursor-pointer bg-[#e9e6f5] max-w-max  text-[#9651f8] text-center py-3 px-2 mt-5 ">
                Update Password
              </div>
            </Link>
          </div>
          <div className="right">
            <Chart
              revenueData={revenueData}
              aspect={4 / 1}
              title="User Spending ( Last 6 Months)"
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Latest Customer Transactions</h1>
          <List orderIsLoading={orderIsLoading} orders={orderData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardUserProfile;
