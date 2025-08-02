import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { TbLoader3 } from "react-icons/tb";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      product: "",
      amount: "",
    },
  });

  const { mutateAsync: createPaymentIntent } = useMutation({
    mutationFn: async (amount) => {
      const res = await axiosSecure.post("/api/create-payment-intent", {
        amount,
      });
      return res.data;
    },
  });

  const { mutateAsync: savePayment } = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosSecure.post("/api/save-payment", paymentData);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    const amount = parseFloat(data.amount);

    if (!stripe || !elements) return;
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setIsPaying(true);
      const { clientSecret } = await createPaymentIntent(amount);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await savePayment({
          paymentIntentId: result.paymentIntent.id,
          amount,
          email: user?.email,
          name: user?.displayName,
          product: data.product,
        });

        setSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Donation Successful",
          text: `Thank you, ${user?.displayName || "Donor"}!`,
        });
      }
    } catch (err) {
      setError(err.message || "Donation failed.");
    } finally {
      setIsPaying(false);
    }
  };

  const amountValue = watch("amount");

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-base-100 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-base-content">Complete Your Donation</h2>

      {success ? (
        <div className="alert alert-success">
          <span className="text-success-content font-medium">
            Donation successful! Thank you for your support.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Your Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full bg-base-200 text-base-content focus:input-primary"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-error text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Product */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Purpose</span>
            </label>
            <input
              type="text"
              {...register("product", { required: "Purpose is required" })}
              className="input input-bordered w-full bg-base-200 text-base-content focus:input-primary"
              placeholder="e.g. Blood Donation Campaign"
            />
            {errors.product && (
              <p className="text-error text-sm mt-2">{errors.product.message}</p>
            )}
          </div>

          {/* Amount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Amount (USD)</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 1,
                  message: "Minimum amount is $1",
                },
              })}
              className="input input-bordered w-full bg-base-200 text-base-content focus:input-primary"
              placeholder="e.g. 19.99"
            />
            {errors.amount && (
              <p className="text-error text-sm mt-2">{errors.amount.message}</p>
            )}
          </div>

          {/* Card Element */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">Card Details</span>
            </label>
            <div className="border border-base-300 rounded-lg p-4 bg-base-200">
              <CardElement className="text-base-content" />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error">
              <span className="text-error-content">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPaying || !amountValue}
            className="btn btn-primary w-full text-lg font-semibold"
          >
            {isPaying ? (
              <span className="flex items-center gap-2 justify-center">
                <TbLoader3 className="animate-spin text-2xl"/> Processing...
              </span>
            ) : (
              `Donate $${amountValue || ""}`
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;