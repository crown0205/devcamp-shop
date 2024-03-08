import { signUpSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";
import { useToast } from "../ui/use-toast";
import { AuthType } from "@/types/auth";

type ISignUpSchema = z.infer<typeof signUpSchema>;
interface SignUpFormProps {
  currentTab: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ currentTab }) => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<ISignUpSchema>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onChange",
    defaultValues: {
      id: "",
      password: "",
      passwordConfirm: "",
      email: "",
      name: "",
      birthday: "",
      phoneNumber: "",
    },
  });

  const signupConstants = {
    step1: [
      {
        label: "아이디",
        name: "id",
        placeholder: "아이디를 입력해주세요",
      },
      {
        label: "비밀번호",
        name: "password",
        placeholder: "비밀번호를 입력해주세요",
        type: "password",
      },
      {
        label: "비밀번호 확인",
        name: "passwordConfirm",
        placeholder: "비밀번호를 다시 입력해주세요",
        type: "password",
      },
    ],
    step2: [
      {
        label: "이름",
        name: "name",
        placeholder: "이름을 입력해주세요",
      },
      {
        label: "이메일",
        name: "email",
        placeholder: "이메일을 입력해주세요",
      },
      {
        label: "생년월일",
        name: "birthday",
        placeholder: "생년월일을 입력해주세요",
      },
      {
        label: "휴대폰번호",
        name: "phoneNumber",
        placeholder: "휴대폰번호를 입력해주세요",
      },
    ],
  };

  useEffect(() => {
    console.log({ currentTab });
    if (currentTab !== AuthType.SIGNUP) {
      setStep(0);
    }
  }, [currentTab]);

  const handleStep = () => {
    if (step === 0) {
      const { password, passwordConfirm } = form.getValues();
      form.trigger(["id", "password", "passwordConfirm"]).then((result) => {
        if (result) {
          if (password !== passwordConfirm)
            form.setError("passwordConfirm", {
              message: "비밀번호가 일치하지 않습니다",
            });
          else setStep(1);
        }
      });
    }

    if (step === 1) {
      setStep(0);
    }
  };

  const onSubmit = (data: ISignUpSchema) => {
    console.log({ data });
    // TODO : 회원가입 요청

    toast({
      title: "회원가입 성공",
    });
    form.reset();
    // FIXME : 회원가입 성공시 로그인 페이지로 이동
  };
  return (
    <TabsContent value="sign-up">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="signup-form"
              className="flex w-full overflow-hidden"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <motion.div
                className="min-w-full space-y-2 "
                animate={{
                  opacity: [0, 1],
                  x: [100, 0],
                  translateX: `${step * -100}%`,
                }}
                transition={{ duration: 0.3 }}
              >
                {signupConstants.step1.map((constant) => (
                  <FormField
                    control={form.control}
                    key={constant.name}
                    name={constant.name as keyof ISignUpSchema}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{constant.label}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id={constant.name}
                            placeholder={constant.placeholder}
                            type={constant.type}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </motion.div>
              <motion.div
                className="min-w-full space-y-2 "
                animate={{
                  opacity: [0, 1],
                  x: [100, 0],
                  translateX: `${step * -100}%`,
                }}
                transition={{ duration: 0.3 }}
              >
                {signupConstants.step2.map((constant) => (
                  <FormField
                    control={form.control}
                    key={constant.name}
                    name={constant.name as keyof ISignUpSchema}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{constant.label}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id={constant.name}
                            placeholder={constant.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </motion.div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-4 w-full">
          <Button type="button" className="flex gap-2" onClick={handleStep}>
            {step === 1 && <ArrowLeft className="h-4 w-4" />}
            {step === 0 ? "다음" : "이전"}
            {step === 0 && <ArrowRight className="h-4 w-4" />}
          </Button>
          {step === 1 && (
            <Button form="signup-form" type="submit">
              회원가입
            </Button>
          )}
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SignUpForm;
