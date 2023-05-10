import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 className={`text-center font-bold text-lg`}>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
