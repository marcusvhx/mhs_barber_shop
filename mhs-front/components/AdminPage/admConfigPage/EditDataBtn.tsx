export default function EditDataBtn({
  errorMessage,
  saveDataFunc,
}: {
  errorMessage: string;
  saveDataFunc: () => void;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-red-500 text-md">{errorMessage}</p>
      <button
        onClick={saveDataFunc}
        className="bg-emerald-400 hover:bg-emerald-500 w-full py-2 text-white font-bold rounded capitalize transition"
      >
        editar dados
      </button>
    </div>
  );
}
