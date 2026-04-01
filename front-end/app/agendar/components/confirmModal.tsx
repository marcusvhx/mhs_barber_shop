import WhatsappIcon from "@/components/ui/WhatsappIcon";

export default function ConfirmModal({
  isModalOpen,
  closeModal,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <div
      data-is-open={isModalOpen}
      className={`
        fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
        bg-background
        rounded-xl
        p-4
        w-80 max-w-[90dvw] sm:max-w-sm h-fit
        text-center
        hidden data-[is-open=true]:flex flex-col items-center justify-center gap-4
        `}
    >
      <h1 className="font-semibold text-lg text-nowrap">
        Confirmar o agendamento com
      </h1>

      <div className="grid place-center gap-4">
        <a
          href="https://wa.me/5581986799977?text=c"
          target="_blank"
          className={`
            border-2 border-primary/90
            text-foreground
            py-2 px-3
            rounded-full
            hover:bg-primary/90 hover:text-background hover:font-semibold
            cursor-pointer transition-colors
            flex items-center gap-2
            group
            `}
        >
          <WhatsappIcon className="fill-foreground group-hover:fill-background" />
          <p>Whatsapp</p>
        </a>
        {/* <button
          className={`
            border-2 border-primary
            text-foreground
            py-2 px-3
            rounded-full
            hover:bg-primary/90 hover:text-background hover:font-semibold
            cursor-pointer transition-colors
            `}
        >
          Google Calendar
        </button>
        <button
          className={`
            sm:hidden
            border-2 border-primary
            text-foreground
            py-2 px-3
            rounded-full
            hover:bg-primary/90 hover:text-background hover:font-semibold
            cursor-pointer transition-colors
            `}
        >
          Calendario do smartphone
        </button> */}
      </div>
      <button onClick={closeModal} className="text-white underline cursor-pointer">Fechar</button>
    </div>
  );
}
