import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../../components/common/Loader";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const EditDonationRequest = ({ requestId, onClose }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: request, isLoading: isLoadingRequest } = useQuery({
    queryKey: ["donationRequest", requestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${requestId}`);
      return res.data;
    },
    enabled: !!requestId,
  });
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get("/districts.json");
        setDistricts(res.data);
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    };

    fetchDistricts();
  }, []);

  // upazila fetch
  useEffect(() => {
    const fetchUpazilas = async () => {
      if (!selectedDistrict) return;

      try {
        const res = await axios.get("/upazilas.json");
        const filteredUpazilas = res.data.filter(
          (upazila) => String(upazila.district_id) === String(selectedDistrict) // ensure type match
        );
        setUpazilas(filteredUpazilas);
      } catch (err) {
        console.error("Error fetching upazilas:", err);
      }
    };

    fetchUpazilas();
  }, [selectedDistrict]);

  useEffect(() => {
    if (request && districts.length) {
      const matchedDistrict = districts.find(
        (d) => d.name === request.recipientDistrict
      );
      const matchedDistrictId = matchedDistrict?.id || "";

      setSelectedDistrict(matchedDistrictId);
      reset({
        recipientName: request.recipientName,
        hospitalName: request.hospitalName,
        addressLine: request.addressLine,
        bloodGroup: request.bloodGroup,
        donationDate: request.donationDate,
        donationTime: request.donationTime,
        requestMessage: request.requestMessage,
      });

      setValue("recipientDistrict", matchedDistrictId);
    }
  }, [request, districts, reset, setValue]);

  useEffect(() => {
    if (request && upazilas.length) {
      setValue("recipientUpazila", request.recipientUpazila);
    }
  }, [request, upazilas, setValue]);
  // Filter upazilas based on selected district
  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrict)
  );

  const mutation = useMutation({
    mutationFn: async (updatedRequest) => {
      const res = await axiosSecure.patch(
        `/donation-requests/${requestId}`,
        updatedRequest
      );
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text:
          data.modifiedCount > 0
            ? "Donation request has been updated."
            : "No changes were made, but saved successfully.",
      });
      queryClient.invalidateQueries(["donationRequests"]);
      onClose();
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const selectedDistrictData = districts.find(
      (d) => d.id == data.recipientDistrict
    );

    const updatedRequest = {
      ...data,
      recipientDistrict: selectedDistrictData.name,
    };

    try {
      await mutation.mutateAsync(updatedRequest);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update donation request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingRequest) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-base-content mb-6">
        ✏️ Edit Donation Request
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Recipient Name"
            {...register("recipientName", { required: true })}
            className="input input-bordered w-full"
          />
          <select
            {...register("recipientDistrict", {
              required: true,
              onChange: (e) => setSelectedDistrict(e.target.value),
            })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Hospital Name"
            {...register("hospitalName", { required: true })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Address Line"
            {...register("addressLine", { required: true })}
            className="input input-bordered w-full"
          />
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <textarea
          {...register("requestMessage", { required: true })}
          placeholder="Request Message"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
