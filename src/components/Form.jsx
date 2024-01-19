import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import KMPSearch from "@/lib/Algo";

import { UserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Form = ({ changeData }) => {
  const { username, nickname, mother, father } = useContext(UserContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    changeData(data);
    navigate("/password");
    
  };

  return (
    <div>
      <form
        className="flex flex-col gap-6 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="username">Username</Label>
          <Input {...register("username")} id="username" />
        </div>
        <div>
          <Label htmlFor="nickname">Nickname: </Label>
          <Input {...register("nickname")} id="nickname" />
        </div>
        <div>
          <Label htmlFor="mother">Mother's Name</Label>
          <Input {...register("mother")} id="mother" />
        </div>
        <div>
          <Label htmlFor="father">Father's Name</Label>
          <Input {...register("father")} id="father" />
        </div>
        

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Form;
