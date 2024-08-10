import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../../components/common/Button";

import Notification from "antd/es/notification";

import Network from "../../../services/index";

import validateEmail from "../../../helpers/validateEmail";

import "./SignIn.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Inputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const navigate = useNavigate();


  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return Network.signIn(data.email, data.password);
    },
    onError: (error) => {
      console.log(error);
      Notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        const token = data.data.token;
        localStorage.setItem("authToken", token);
        navigate('/');
      } else {
        Notification.error({
          message: "Error",
          description: data.message,
        });
      }

    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    mutate({
      email: email,
      password: password,
    });
  };

  return (
    <div className="signin-container">
      <div className="form-container">
        <div className="image-container">
          <img
            src="https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4"
            className="image"
            alt="Radyse Moon logo"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("email", {
                required: true,
                validate: validateEmail,
              })}
              className="form-control"
              placeholder="Email"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register("password", { required: true })}
              className="form-control"
              placeholder="Password"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <Button type="submit" design="primary long" disabled={!isValid}>
              {isPending ? "LOADING ..." : "SUBMIT"}
            </Button>
          </div>
        </form>
        <div className="link-container">
          <a href="/forgot-password">forgot password</a>
        </div>
      </div>
    </div>
  );
}
