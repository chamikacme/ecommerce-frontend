import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AxiosClient from "@/lib/axios-client/axiosClient";
import useAuthStore from "@/store/authStore";
import useLoadingStore from "@/store/loadingStore";
import { Product } from "@/types/Product";
import { ChevronLeftCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const { setLoading, isPageLoading } = useLoadingStore((state) => state);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);

  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    const fetchTestData = async () => {
      setLoading(true);
      try {
        const response = await AxiosClient().get(`/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
        navigate("/");
      }
    };
    fetchTestData();
  }, [id, navigate, setLoading]);

  async function deleteProduct() {
    setLoading(true);
    try {
      await AxiosClient().delete(`/products/${id}`);
      setLoading(false);
      toast({
        title: "Product deleted",
        description: `Product ${product.name} deleted successfully`,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error",
        description: "An error occurred while deleting the product",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="grid gap-2 p-3 container">
      <Card className="p-4">
        {isPageLoading ? (
          <div>Loading</div>
        ) : (
          <div>
            <Link to={"/"} className="flex gap-2 items-center mb-2">
              <ChevronLeftCircle size={20} />
              Back
            </Link>
            <div className="text-3xl font-medium mb-2">Products Details</div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-900">
                {product.name}
              </h1>
              {user.isLogged && product && user._id === product.userId && (
                <div>
                  <Button
                    className="px-4 py-2"
                    onClick={() => {
                      navigate(`/products/${product._id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="px-4 py-2 ml-2"
                    onClick={async () => {
                      await deleteProduct();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-4">
              <img
                src={
                  product.image && product.image != ""
                    ? product.image
                    : `https://www.shutterstock.com/image-photo/chocolate-cake-berries-600nw-394680466.jpg`
                }
                alt=""
                className="w-96 object-cover rounded-xl"
              />
            </div>
            <div className="mt-4">
              <p className="text-slate-900">
                <span className="font-bold">Price:</span> ${product.price}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductPage;
