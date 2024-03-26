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
import { signUpformSchema } from "@/types/SignUpFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const SignUpPage = () => {
  const signup = useAuthStore((state) => state.signup);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpformSchema>) {
    try {
      setLoading(true);
      await signup(data);
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
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your details to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <FormItem>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  id="fullName"
                  type="text"
                  {...form.register("fullName")}
                  onKeyDown={handleKeyDown}
                />
                <FormMessage>
                  {form.formState.errors.fullName?.message}
                </FormMessage>
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                <Input
                  id="mobileNumber"
                  type="tel"
                  autoComplete="mobileNumber"
                  {...form.register("mobileNumber")}
                  onKeyDown={handleKeyDown}
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
                  {...form.register("password")}
                  onKeyDown={handleKeyDown}
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
                  Sign Up
                </Button>
              </FormItem>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-center text-gray-700 mb-2">
              <span>Already have an account? </span>
              <Link to="/login" className="hover:underline cursor-pointer">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
