interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
}

export function Button({ text, type }: ButtonProps) {
  return (
    <button className=""
      type={type}>
      {text}
    </button>
  )
}