type ITextInput = { placeholder: string };

interface ISelectInput extends ITextInput {
  options: string[];
}

interface IDateInput extends ITextInput {
  unavailableDays: Date[];
}

const textInputs: ITextInput[] = [
  { placeholder: "Qual o seu nome?" },
  { placeholder: "Qual o seu número de celular?" },
];

const dateInputs: IDateInput[] = [
  {
    placeholder: "Veja horários disponiveis",
    unavailableDays: [],
  },
];

const selectInputs: ISelectInput[] = [
  {
    placeholder: "De qual serviço você precisa?",
    options: ["Cabelo", "Barba", "Cabelo e Barba"],
  },
  {
    placeholder: "Escolha o seu barbeiro",
    options: ["barbeiro", "cabelereiro", "quimico"],
  },
];

const inputsData = { selectInputs, dateInputs, textInputs };

export { inputsData };
