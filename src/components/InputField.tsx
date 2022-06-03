import React, { useRef } from "react";
import "./style/todoTask.scss";
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    inputRef.current?.focus();
    handleAdd(e);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="addTodo">
      <input
        ref={inputRef}
        type="text"
        className="form-control addTodo__input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter Task ...."
      />
      <button
        type="submit"
        className="addTodo__submit position-absolute border bg-primary text-light"
        style={{ right: 0, top: 0, bottom: 0, width: "64px" }}
      >
        ADD
      </button>
    </form>
  );
};

export default InputField;
