import Title from "@/components/ui/Title";

export default function Address({}: {}) {
  return (
    <div className="flex flex-col gap-4 items-center w-[95%] md:w-4/5 h-80 p-2 bg-neutral-900 shadow-xl shadow-black rounded-lg sm:row-span-2">
      <Title>Nosso endereço</Title>
      <iframe
        className="size-full rounded-lg"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463.1840754716972!2d-34.933242527819694!3d-8.160951006872551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae15481497225%3A0x54f2f4c73b3f7379!2sMHS%20barber%20shop!5e0!3m2!1spt-BR!2sbr!4v1687784096271!5m2!1spt-BR!2sbr"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="text-xs font-light text-center">
        R. Martinópolis, 844 - Muribeca dos Guararapes
        <br/>
        Jaboatão dos Guararapes - PE, 54320-042
      </p>
    </div>
  );
}
