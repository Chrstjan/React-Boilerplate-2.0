import s from "./Button.module.scss";

export const Button = ({action, type, text}) => {
  return (
    <button onClick={() => action()} className={`${s[type]}`}>{text}</button>
  )
}