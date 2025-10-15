import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email("Неверный email").required("Требуется email"),
  password: yup.string().min(6, "Минимум 6 символов").required("Требуется пароль")
}).required();

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      toast.success("Успешный вход");
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Ошибка входа — проверьте данные или сервер.";
      toast.error(msg);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
        <label className="block mb-2 text-sm">Email</label>
        <input {...register("email")} type="email" className="w-full mb-1 p-2 border rounded" />
        {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email.message}</div>}

        <label className="block mb-2 text-sm">Пароль</label>
        <input {...register("password")} type="password" className="w-full mb-1 p-2 border rounded" />
        {errors.password && <div className="text-red-600 text-sm mb-2">{errors.password.message}</div>}

        <button disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded mt-3">
          {isSubmitting ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
