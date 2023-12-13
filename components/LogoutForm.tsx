import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { RootState } from "@/redux/store";

interface LogoutFormProps {
  onLogout: () => void;
}

const LogoutForm: React.FC<LogoutFormProps> = ({ onLogout }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((state: RootState) => state.auth.dataLogin?.token);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const logoutApi = await axiosInstance.post("/logout", {}, { headers });
      if (logoutApi.status === 200) {
        closeModal();
        dispatch(logout());
        onLogout();
      } else {
        console.error("Logout failed:", logoutApi.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Button
        onClick={openModal}
        color="primary"
        className="mx-2"
        variant="shadow"
      >
        Logout
      </Button>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
            <ModalBody className="flex flex-col gap-5 justify-items-center items-center">
              <span>
                <i className="bi bi-box-arrow-left text-5xl"></i>
              </span>
              <h2>Apakah anda serius ingin melakukan Logout ?</h2>
            </ModalBody>
            <ModalFooter className="flex flex-row gap-3 justify-end">
              <Button color="primary" onPress={handleLogout}>
                Confirm Logout
              </Button>
              <Button color="danger" variant="flat" onPress={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutForm;
