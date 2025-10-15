import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Введите имя"),
  email: yup.string().email("Неверный email").required("Требуется email"),
  password: yup.string().min(6, "Минимум 6 символов").required("Требуется пароль")
}).required();

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      toast.success("Регистрация прошла — войдите в систему");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Ошибка регистрации.";
      toast.error(msg);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
        <label className="block mb-2 text-sm">Имя</label>
        <input {...register("name")} className="w-full mb-1 p-2 border rounded" />
        {errors.name && <div className="text-red-600 text-sm mb-2">{errors.name.message}</div>}

        <label className="block mb-2 text-sm">Email</label>
        <input {...register("email")} type="email" className="w-full mb-1 p-2 border rounded" />
        {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email.message}</div>}

        <label className="block mb-2 text-sm">Пароль</label>
        <input {...register("password")} type="password" className="w-full mb-1 p-2 border rounded" />
        {errors.password && <div className="text-red-600 text-sm mb-2">{errors.password.message}</div>}

        <button disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded mt-3">
          {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
