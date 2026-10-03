import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner, toast } from "../../components/ui";
import { motion } from "framer-motion";
import { useAdminLogin } from "../../api/admin";
import { Toaster } from "sonner";
import useAuthStore from "../../store/useAuthStore";

export default function Login() {
  const {
    mutateAsync: loginAdmin,
    isPending: isLoginAdminLoading,
    isError: isAdminLoginError,
  } = useAdminLogin();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginAdmin(data);
      const { user, token } = res.data;
      if (user && token) {
        setAuth(user, token);
        toast.success(res.message);
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const inputClass = (field) =>
    `w-full py-3 px-4 border ${
      errors[field] ? "border-red-500" : "border-gray-200"
    } rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400`;
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/bfcn-bg.png")',
      }}
    >
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center mb-6"
          >
            <img
              src="/images/bfcn-logo.png"
              alt="BFCN"
              className="w-16 h-16 rounded-full shadow-lg"
            />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>

          <p className="text-gray-600">Sign in to manage BFCN</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Enter your email"
                autoComplete="email"
                className={inputClass("email")}
              />

              {errors.email && (
                <span className="text-sm text-red-600 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`${inputClass("password")} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="text-sm text-red-600 mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoginAdminLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginAdminLoading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="small" className="text-white" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 font-medium mb-2">
              Demo Credentials:
            </p>

            <p className="text-xs text-blue-600">Email: admin@bfcn.org</p>

            <p className="text-xs text-blue-600">Password: admin123</p>

            <p className="text-xs text-blue-500 mt-1">
              Any valid email/password combination will work for demo purposes.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Bright Future Community Network. All
            rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
