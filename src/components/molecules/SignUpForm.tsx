import { signUpSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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

type ISignUpSchema = z.infer<typeof signUpSchema>;
interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
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

  // 주소, 상세주소, 우편번호,
  // NOTE : 아이디, 비밀번호, 비밀번호 확인, 이메일, 이름, 생년월일, 휴대폰번호,

  const signupConstants = [
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
    {
      label: "이메일",
      name: "email",
      placeholder: "이메일을 입력해주세요",
    },
    {
      label: "이름",
      name: "name",
      placeholder: "이름을 입력해주세요",
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
  ];

  const onSubmit = (data: ISignUpSchema) => {
    console.log({ data });
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
              className="space-y-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {signupConstants.map((constant) => (
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
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button form="signup-form" type="submit">
            회원가입
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SignUpForm;
