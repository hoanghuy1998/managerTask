import { toast } from "react-toastify";

export const success = (c: string) => {
  return toast.success(`${c}`);
};
export const warning = (c: string) => {
  return toast.warning(`${c}`);
};
export const error = (c: string) => {
  return toast.error(`${c}`);
};
