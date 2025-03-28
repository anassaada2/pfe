"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      loginSchema.parse(form);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de connexion");

      toast.success("Connexion réussie !");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => toast.error(error.message));
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Toaster position="top-center" />

      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light text-center flex-column mt-5">
          <h1 className="display-4 fw-bold">Content de vous revoir !</h1>
          <Image
            src="/image/AFEC/logo.png"
            width={400}
            height={400}
            alt="Logo"
          />
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-4 text-center">Connexion</h2>
          <form className="w-75" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="mb-3 text-end">
              <Link href="/forgot-password" className="text-decoration-none">
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Se connecter
            </button>

            <div className="mt-3 text-center">
              <span>Pas de compte ? </span>
              <Link href="/auth/register     " className="text-decoration-none">
                S'inscrire
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
