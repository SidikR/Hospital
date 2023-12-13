// LoginForm.tsx
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  Button,
} from "@nextui-org/react";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch } from "app/hooks";
import { login } from "@/redux/authSlice";

interface LoginFormProps {
  onLoginSuccess: (userData: UserData) => void; // Corrected prop name
}

interface UserData {
  token: string;
  message: string;
  username: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      dispatch(login(response.data));
      onLoginSuccess(response.data);
      setUsername("");
      setPassword("");
      setRememberMe(false);
      closeModal();
    } catch (error) {
      // Handle login failure
      console.error("Error during login:", error);
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
        Login
      </Button>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Log in
            </ModalHeader>
            <ModalBody className="mb-3">
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <Input
                  autoFocus
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div style={{ position: "relative" }}>
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
                <Button color="primary" type="submit">
                  Sign in
                </Button>
              </form>
            </ModalBody>
            {/* <ModalFooter>
    
            </ModalFooter> */}
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginForm;
