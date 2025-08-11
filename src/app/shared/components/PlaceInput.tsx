import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { type Suggestion } from "../../../lib/types";
import { debounce } from "./../../../lib/util/util";

type Props<T extends FieldValues> = {
  type?: string;
  label: string;
} & UseControllerProps<T>;

export default function PlaceInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue);
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationUrl =
    "https://api.locationiq.com/v1/autocomplete?dedupe=1&limit=6&key=pk.cabb3bcb245457d35426e22cd4b1517c";

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const res = await fetch(`${locationUrl}&q=${query}`);
          const data = await res.json();
          setSuggestions(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 1000),
    [locationUrl]
  );

  const handleChange = async (value: string) => {
    setInputValue(value);
    field.onChange({ venue: value });
    await fetchSuggestions(value);
  };

  const handleSelect = (location: Suggestion) => {
    const venue = location.display_name;
    const city = location.address.city;
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);
    field.onChange({ venue, city, latitude, longitude });
    setSuggestions([]);
  };

  return (
    <label className="floating-label text-left w-full">
      <span>{props.label}</span>
      <input
        {...field}
        value={inputValue}
        type={props.type}
        className={clsx("input input-lg w-full", {
          "input-error": !!fieldState.error,
          "input-success": !fieldState.error && fieldState.isDirty,
        })}
        placeholder={props.label}
        onChange={(e) => handleChange(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="list rounded-box p-1 shadow-md">
          {suggestions.map((suggestion) => (
            <li
              className="list-row p-1 cursor-pointer hover:bg-base-300"
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
      {fieldState.error ? (
        <div className=" text-error">{fieldState.error.message}</div>
      ) : (
        ""
      )}
    </label>
  );
}
