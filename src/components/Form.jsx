import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import KMPSearch from "@/lib/Algo";
import { DatePicker } from "./Calendar";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Form = ({ changeData }) => {
  const { username, nickname, mother, father } = useContext(UserContext);
  const [date, setDate] = useState(Date.now());
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {

    console.log(data)
    changeData(data);
    await axios.post("http://localhost:3000/", data)
    navigate("/password");
  };

  const handleDate = (data) => {
    let filteredDate = data.toString().split(" ")
    setDate(data)
    let dob = filteredDate[1] + " " + filteredDate[2] + " " + filteredDate[3]
    console.log(dob)
    setValue("dob", dob)
  }

  return (
    <Card className="w-[75vw] shadow-xl text-gray-700 bg-[#52B69A] ">
      <CardHeader>
        <CardTitle>
          Enhance Your Security: Craft a Robust Password Today!
        </CardTitle>
        <CardDescription className="text-white">
          Please enter your details below, and we'll analyze them to determine
          if your password is strong or weak. Your online security matters to
          us!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-9 items-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-6">
            <Label htmlFor="username">Full Name </Label>
            <Input {...register("username")} id="username" />
            <Label htmlFor="nickname">Nick Name </Label>
            <Input {...register("nickname")} id="nickname" />
          </div>
          <div className="flex items-center gap-6">
            <Label htmlFor="mother">Mother's Name </Label>
            <Input {...register("mother")} id="mother" />
            <Label htmlFor="father">Father's Name </Label>
            <Input {...register("father")} id="father" />
          </div>
          <div className="flex items-center gap-6">
            <Label htmlFor="spouse">Spouse's Name </Label>
            <Input {...register("spouse")} id="spouse" />
            <Label htmlFor="sister">Sister's Name </Label>
            <Input {...register("sister")} id="sister" />
          </div>
          <div className="flex items-center gap-6">
            <Label className="w-[4vw]" htmlFor="brother">Brother's Name</Label>
            <Input
              className="w-[30vw] "
              {...register("brother")}
              id="brother"
            />
            <Label htmlFor="dob" className="w-[5vw]">Date of Birth </Label>
            <DatePicker id="dob" date={date} handleDate={handleDate} />
          </div>
          <center>
            <Button className="w-[20vw] hover:scale-110" type="submit">
              Submit
            </Button>
          </center>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
