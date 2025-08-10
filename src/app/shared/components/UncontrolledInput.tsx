import clsx from "clsx";
import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  options: RegisterOptions<T>;
  type?: string;
  label: string;
};

const UncontrolledInput = <T extends FieldValues>({
  register,
  name,
  errors,
  options,
  type = "text",
  label,
}: Props<T>) => {
  return (
    <label className="floating-label text-left">
      <span>{label}</span>
      <input
        {...register(name, options)}
        type={type}
        className={clsx("input input-lg w-full", {
          "input-error": errors[name],
        })}
        placeholder={label}
      />
      {errors[name] && (
        <div className="validator-hint text-error">
          {errors[name]?.message as string}
        </div>
      )}
    </label>
  );
};

export default UncontrolledInput;
