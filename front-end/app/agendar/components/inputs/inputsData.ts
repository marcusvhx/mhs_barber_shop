import { ISelectInput, ITextInput } from "../../types";

const textInputs: ITextInput[] = [
  { placeholder: "Qual o seu nome?" },
  { placeholder: "Qual o seu número de celular?" },
];

const selectInputs: ISelectInput[] = [
  {
    placeholder: "De qual serviço você precisa?",
    options:["corte - cabelo", "corte - barba", "corte - cabelo e barba"]
  },
  {
    placeholder: "Escolha o seu barbeiro",
    options: ["barbeiro", "cabelereiro", "químico"],
  },
];

const inputsData = { selectInputs, textInputs };

export { inputsData };
