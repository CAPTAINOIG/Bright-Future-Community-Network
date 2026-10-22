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
    `w-full h-12 px-4 border ${
      errors[field] ? "border-red-400" : "border-gray-300"
    } rounded-xl bg-white text-[15px] text-gray-900 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition-all placeholder:text-gray-400`;
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-white">
      <Toaster position="top-right" />

      {/* Brand panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-primary-900 bg-cover bg-center p-12 xl:p-16 text-white"
        style={{ backgroundImage: 'url("/images/bfcn-bg.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-900/85 to-primary-800/80" />
        <div className="relative flex items-center gap-3">
          <img src="/images/bfcn-logo.png" alt="" className="w-11 h-11 rounded-full bg-white object-contain" />
          <div className="leading-none">
            <p className="font-serif text-lg m-0">Bright Future</p>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-300 m-0">Community Network</p>
          </div>
        </div>
        <div className="relative max-w-[460px]">
          <p className="eyebrow text-accent-300 mb-5"><span className="h-px w-6 bg-accent-300" />Admin console</p>
          <h2 className="font-serif text-5xl leading-[1.05] mb-5">Manage the work that moves communities forward.</h2>
          <p className="text-white/65 text-base leading-relaxed m-0">Members, volunteers, programmes, events and stories — all in one place.</p>
        </div>
        <p className="relative text-[13px] text-white/40 m-0">© {new Date().getFullYear()} Bright Future Community Network</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px]"
        >
          <img src="/images/bfcn-logo.png" alt="BFCN" className="lg:hidden w-14 h-14 rounded-full mb-8 ring-1 ring-gray-200" />
          <h1 className="font-serif text-[2.25rem] leading-tight text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-[15px] mb-10">Sign in to the BFCN admin console.</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email address
              </label>

              <input
                id="admin-email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="name@bfcn.org"
                autoComplete="email"
                className={inputClass("email")}
              />

              {errors.email && (
                <span className="text-[13px] text-red-600 mt-1.5 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  id="admin-password"
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
                  className={`${inputClass("password")} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="text-[13px] text-red-600 mt-1.5 block">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoginAdminLoading}
              className="w-full h-12 mt-2 flex items-center justify-center rounded-full border-none text-[15px] font-semibold text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoginAdminLoading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="small" className="text-white" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {import.meta.env.DEV && (
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
              <p className="font-semibold text-gray-800 mb-1">Demo credentials (dev only)</p>
              <p className="m-0">admin@bfcn.org · admin123</p>
            </div>
          )}

          <p className="lg:hidden text-center text-[13px] text-gray-400 mt-12">
            © {new Date().getFullYear()} Bright Future Community Network
          </p>
        </motion.div>
      </div>
    </div>
  );
}
