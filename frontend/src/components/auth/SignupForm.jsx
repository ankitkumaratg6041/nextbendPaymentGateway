import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./SignupSchema";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data) => {
      try {
        console.log(`inside onsubmit method`)
      const res = await axios.post("http://localhost:5000/auth/signup", data);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="w-1/2 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>

        {/* Render inputs */}
        {[
          ["name", "Full Name"],
          ["email", "Email"],
          ["phone", "Phone Number"],
          ["website", "Website (optional)"],
          ["linkedin", "LinkedIn (optional)"],
          ["facebook", "Facebook (optional)"],
          ["companyName", "Company Name"],
          ["password", "Password"],
        ].map(([field, label]) => (
          <div key={field}>
            <Label>{label}</Label>
            <Input
              type={field === "password" ? "password" : "text"}
              {...register(field)}
            />
            {errors[field] && (
              <p className="text-sm text-red-600">{errors[field].message}</p>
            )}
          </div>
        ))}

        {/* Bigger Textarea for custom message */}
        <div>
          <Label>Your Message (optional)</Label>
          <Textarea
            rows={10}
            {...register("customMessage")}
            placeholder="Tell us more about your needs..."         
          />
          {errors.customMessage && (
            <p className="text-sm text-red-600">{errors.customMessage.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
