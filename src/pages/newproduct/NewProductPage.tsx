import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AxiosClient from "@/lib/axios-client/axiosClient";
import useAuthStore from "@/store/authStore";
import useLoadingStore from "@/store/loadingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";

const NewProductFormSchema = z.object({
  name: z.string().min(3),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: "Price must be a number",
    })
    .transform(Number)
    .refine((value) => value > 0, {
      message: "Price must be a positive, non-zero value",
    }),
});

const NewProductPage = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const { toast } = useToast();

  const { id } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof NewProductFormSchema>>({
    resolver: zodResolver(NewProductFormSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof NewProductFormSchema>) {
    setLoading(true);
    try {
      var response;
      if (id) {
        response = await AxiosClient().put(`/products/${id}`, data);
      } else {
        response = await AxiosClient().post("/products", data);
      }
      toast({
        title: "Product created",
        description: `Product ${response.data.data.name} created successfully`,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: `An error occurred while ${
          id ? "updating" : "creating"
        } the product`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchTestData = async () => {
      setLoading(true);
      try {
        const response = await AxiosClient().get(`/products/${id}`);
        if (response.status === 200) {
          if (response.data.data.userId != user._id) {
            navigate(`/products/${id}`);
          }
          form.reset(response.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchTestData();
    }
  }, [id, navigate, setLoading]);

  return (
    <div className="grid gap-2 p-3 container">
      <Card className="p-4">
        <div>
          <Link to={"/"} className="flex gap-2 items-center mb-2">
            <ChevronLeftCircle size={20} />
            Back
          </Link>
          <div className="text-3xl font-medium mb-2">
            {id ? "Update Product" : "New Product"}
          </div>
          <Form {...form}>
            <div className="grid gap-4 mt-2 mr-2">
              <FormItem>
                <FormLabel htmlFor="name">Asset Name</FormLabel>
                <Input id="name" type="text" {...form.register("name")} />
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input id="price" type="number" {...form.register("price")} />
                <FormMessage>
                  {form.formState.errors.price?.message}
                </FormMessage>
              </FormItem>

              <FormMessage>{form.formState.errors.root?.message}</FormMessage>

              <div className="flex gap-2">
                <FormItem>
                  <Button
                    className="w-40"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    {id ? "Update" : "Add"}
                  </Button>
                </FormItem>
                <FormItem>
                  <Button
                    className="w-40"
                    onClick={() => {
                      form.reset();
                    }}
                    variant={"outline"}
                  >
                    Reset
                  </Button>
                </FormItem>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default NewProductPage;
