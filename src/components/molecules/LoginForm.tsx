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
import { motion } from "framer-motion";
import { useToast } from "../ui/use-toast";

type ILoginSchema = z.infer<typeof loginSchema>;

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const { toast } = useToast();
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
    console.log(data);
    // TODO : 로그인 요청

    // NOTE : 로그인 실패 시
    toast({
      title: "로그인 실패",
      description: "이메일 또는 비밀번호를 확인해주세요.",
      variant: "destructive",
    });

    // NOTE : 로그인 성공 시
    // home으로 이동
    const { id, password } = data;
    if (id === "test" && password === "!1234qwer") {
      toast({
        title: "로그인 성공",
      });
      form.reset();
    } else {
      toast({
        title: "로그인 실패",
        description: "이메일 또는 비밀번호를 확인해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            style={{ opacity: 0 }}
            animate={{
              opacity: [0, 1],
              x: [100, 0],
            }}
            transition={{
              duration: 0.3,
            }}
          >
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
          </motion.div>
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
