import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/authStore";
import useLoadingStore from "@/store/loadingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  mobileNumber: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Mobile number can only contain numbers",
    }),
  password: z.string().min(8),
});

const SignInPage = () => {
  const login = useAuthStore((state) => state.login);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await login(data.mobileNumber, data.password);
      navigate("/");
      setLoading(false);
    } catch (error) {
      form.setError("root", {
        message: error as string,
      });
      setLoading(false);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen px-6 w-full overflow-auto h-screen bg-secondary">
      <div className="w-full m-auto max-w-lg overflow-auto py-8 px-2">
        <Card className="pb-4 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your mobile number and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <FormItem>
                <FormLabel htmlFor="email">Mobile Number</FormLabel>
                <Input
                  id="mobileNumber"
                  type="text"
                  autoComplete="mobileNumber"
                  onKeyDown={handleKeyDown}
                  {...form.register("mobileNumber")}
                />
                <FormMessage>
                  {form.formState.errors.mobileNumber?.message}
                </FormMessage>
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  onKeyDown={handleKeyDown}
                  {...form.register("password")}
                />
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>

              <FormMessage>{form.formState.errors.root?.message}</FormMessage>
              <FormItem>
                <Button
                  className="w-full"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Sign in
                </Button>
              </FormItem>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-center text-gray-700 mb-2">
              <span>Don't have an account? </span>
              <Link to="/register" className="hover:underline cursor-pointer">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
