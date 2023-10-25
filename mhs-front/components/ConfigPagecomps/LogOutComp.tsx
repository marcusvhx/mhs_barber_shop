import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LogOutComp({}: {}) {
  const router = useRouter();
  function logOut() {
    deleteCookie("auth");
    router.replace("/entrar");
  }
  return (
    <div className="w-full h-full grid place-items-center">
      <button
        onClick={logOut}
        className="w-fit h-fit px-2 py-3 bg-red-500 hover:bg-red-600 rounded-md text-white hover:font-bold capitalize"
      >
        sair dessa conta
      </button>
    </div>
  );
}
