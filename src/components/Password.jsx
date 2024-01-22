import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { UserContext } from "@/contexts/UserContext";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KMPSearch from "@/lib/Algo";
import { TypographyH2 } from "./ui/TypographyH2";
const Password = () => {
  const [problem, setProblem] = useState([]);
  const [password, setPassword] = useState(null);
  const [count, setCount] = useState(null);
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

  function shuffle(s, data_dir_final) {
    let l = s.split("");
    shuffleArray(l);
    let result = l.join("");

    for (let i = 0; i < data_dir_final.length; i++) {
      if (result.includes(data_dir_final[i])) {
        return shuffle(result, data_dir_final);
      }
    }

    return result;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPassword(data.password);
    if (txt2.length === 0) {
      return;
    }

    let password = data.password.toLowerCase();
    let word_count = 0;
    txt2.forEach((e) => {
      if (KMPSearch(e, password) === 1) {
        word_count++;
      }
    });
    setCount(word_count);
    console.log(count);
  };

  return (
    <Card className="bg-[#52B69A] text-gray-700">
      <CardHeader>
        <center>
          <CardTitle>Password Authenticator</CardTitle>
        </center>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[40vw] flex flex-col gap-6 items-center">
          <Label htmlFor="password">Create a Password</Label>
          <Input
            className="w-[20vw]"
            type="text"
            {...register("password")}
            placeholder="Password"
            id="password"
          />
          <Button className="my-3">Check</Button>
          {count !== null && (
            <Alert className="w-[35vw] my-6 text-gray-700">
              <AlertTitle>
                {count > 1 ? (
                  count > 4 ? (
                    <TypographyH2>
                      <AlertCircle className="text-red-700" />
                      <br />
                      WEAK PASSWORD
                      <br />
                      <AlertDescription>
                        Consider using this password : {shuffle(password, txt2)}
                      </AlertDescription>
                    </TypographyH2>
                  ) : (
                    <TypographyH2>
                      <AlertCircle className="text-red-700" />
                      <br />
                      MODERATE PASSWORD
                      <br />
                      <AlertDescription>
                        Consider using this password : {shuffle(password, txt2)}
                      </AlertDescription>
                    </TypographyH2>
                  )
                ) : (
                  <TypographyH2>
                    <CheckCircle2 className="text-green-600" />
                    <br />
                    STRONG PASSWORD
                    <br />
                    <AlertDescription>
                      You can proceed with the password!
                    </AlertDescription>
                  </TypographyH2>
                )}
              </AlertTitle>
            </Alert>
          )}
        </div>
      </form>
    </Card>
  );
};

export default Password;
