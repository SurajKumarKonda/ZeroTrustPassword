import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { UserContext } from "@/contexts/UserContext";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import KMPSearch from "@/lib/Algo";

const Password = () => {
  const [problem, setProblem] = useState([]);

  const user = useContext(UserContext);
  let kuchbhi = Object.values(user);
  let txt2 = [];
  let max = kuchbhi?.length;

  for (let i = 0; i < max; i++) {
    for (let j = 0; j < kuchbhi[i]?.length - 1; j++) {
      const x = kuchbhi[i][j];
      const y = kuchbhi[i][j + 1];
      txt2.push(x + y);
    }
  }

  console.log(txt2);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (txt2.length === 0) {
      return;
    }
    let problems = [];
    console.log(data);
    txt2.forEach((e) => {
      KMPSearch(e, data.password) !== null &&
        problems.push([...KMPSearch(e, data.password)]);
    });
    setProblem((prev) => [...prev, ...problems]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[40vw] flex flex-col gap-6 items-center">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
          id="password"
        />
        <Button className="my-3">Check</Button>
        {problem.length!==0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            {problem.map((e, i) => (
              <AlertDescription key={i}>
                Similiarity found at {txt2[problem[e]]}{" "}
              </AlertDescription>
            ))}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default Password;
