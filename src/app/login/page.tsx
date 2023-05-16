import { LoginForm } from "./form";
// import Header from "@/components/header.component";

export default function LoginPage() {
  return (
    <>
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="w-5/12 px-8 py-10">
          <h1 className={`text-center font-bold text-lg`}>Sign in</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
