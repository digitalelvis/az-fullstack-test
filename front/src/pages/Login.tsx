import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../store/authStore";
import { callLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import BG from "../assets/images/background/bg-login.jpg";
import PrimaryButton from "../components/Buttons/PrimaryButton";

// Esquema de validação
const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
}).required();

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await callLogin(data);

      if (response.error) {
        toast.error(response.message || "Erro desconhecido.");
        return;
      }

      setUser({
        token: response.token,
        name: response.profile.name,
        email: response.email,
        id: response.id,
      });

      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
    }
  };

  return (
    <div className="columns-2">
      <div className="bg-white h-screen content-center">
        <Logo size="md" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de e-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Endereço de e-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register("email")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Campo de senha */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Senha
                </label>
                <div className="text-sm">
                  <p className="font-semibold text-primary hover:text-primary-500">
                    Esqueceu a senha?
                  </p>
                </div>
              </div>

              <div className="mt-2 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  {...register("password")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                    {showPassword ? "Mostrar" : "Escondder"}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <PrimaryButton label="Sign in" size="md" />
            </div>
          </form>
        </div>
      </div>

      <div>
        <img src={BG} alt="Background" className="w-full h-screen object-cover" />
      </div>
    </div>
  );
};

export default Login;
