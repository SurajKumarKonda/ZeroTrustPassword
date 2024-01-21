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
  const [password, setPassword] = useState(null)
  const user = useContext(UserContext);
  let kuchbhi = Object.values(user);
  let txt2 = [];
  let max = kuchbhi?.length;

  for (let i = 0; i < max; i++) {
    for (let j = 0; j < kuchbhi[i]?.length - 1; j++) {
      const x = kuchbhi[i][j].toLowerCase();
      const y = kuchbhi[i][j + 1].toLowerCase();
      if (!txt2.includes(x + y)) {
        txt2.push(x + y);
      }
    }
  }

  console.log(txt2);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPassword(data.password)
    if (txt2.length === 0) {
      return;
    }
    let problems = [];
    console.log(data);
    let password = data.password.toLowerCase()

    txt2.forEach((e) => {
      KMPSearch(e, password) !== null &&
        problems.push(KMPSearch(e, password)) &&
        console.log(KMPSearch(e, password));
    });
    setProblem([...problems]);
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[40vw] flex flex-col gap-6 items-center">
        <Label htmlFor="password">Password</Label>
        <Input
          type="text"
          {...register("password")}
          placeholder="Password"
          id="password"
        />
        <Button className="my-3">Check</Button>
        {problem.length !== 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            {problem.map((e, i) => (
              <AlertDescription key={i}>
                Similiarity found at {password[e[0]]}{" "}
              </AlertDescription>
            ))}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default Password;
