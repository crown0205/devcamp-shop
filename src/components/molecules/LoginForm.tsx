import { loginSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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

type ILoginSchema = z.infer<typeof loginSchema>;
interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const loginConstants = [
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
  ];

  const onSubmit = (data: ILoginSchema) => {
    console.log({ data });
  };

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="login-form"
              className="space-y-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {loginConstants.map((constant) => (
                <FormField
                  control={form.control}
                  key={constant.name}
                  name={constant.name as keyof ILoginSchema}
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
          <Button form="login-form" type="submit">
            로그인
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default LoginForm;
