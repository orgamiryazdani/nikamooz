import Button from "../button/button";
import style from "../../style/components/pagination.module.css";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "../../lib/react-query";
import { useEffect } from "react";

const Pagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryNumber = Number(searchParams.get("userId"));

  useEffect(() => {
    if (!queryNumber) {
      searchParams.set("userId", "1");
      setSearchParams(searchParams);
    }
  }, []);

  const paginationHandler = (operator: (queryNumber: number) => void) => {
    const numbers =  operator(queryNumber);
    searchParams.set("userId", String(numbers));
    setSearchParams(searchParams);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  return (
    <div className={`flex-center ${style.pagination}`}>
      {queryNumber < 10 && (
        <Button
          onClick={() => paginationHandler((queryNumber) => queryNumber + 1)}
          variant='warning'>
          {"<"}
        </Button>
      )}
      <span>{queryNumber || 1}</span>
      {queryNumber > 1 && (
        <Button
          onClick={() => paginationHandler((queryNumber) => queryNumber - 1)}
          variant='warning'>
          {">"}
        </Button>
      )}
    </div>
  );
};

export default Pagination;
