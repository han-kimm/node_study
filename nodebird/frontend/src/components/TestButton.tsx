import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const TestButton = ({ ...params }: Props) => {
  return <button {...params}>버튼버튼</button>;
};

export default TestButton;
