import { useRevalidator, useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const revalidator = useRevalidator();
  const [search, setSearch] = useSearchParams();
  function updateSearch(key: string, value: string) {
    const newParams = new URLSearchParams(search);
    newParams.set(key, value);
    setSearch(newParams);
    revalidator.revalidate();
  }
  return { search, updateSearch };
}
