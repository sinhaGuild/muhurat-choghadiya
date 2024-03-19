import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AutocompleteResponse, InputGranular } from "@/types/store-types";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type AutocompleteProps = {
  results: AutocompleteResponse[];
  // setInputValue: Dispatch<SetStateAction<string>>;
  setOpenSuggestions: Dispatch<SetStateAction<boolean>>;
  setInputDict: Dispatch<SetStateAction<InputGranular>>;
};

export function AutocompletePopover({
  results,
  // setInputValue,
  setOpenSuggestions,
  setInputDict,
}: AutocompleteProps) {
  const handleClick = async (elem: any) => {
    // setInputValue(elem.city);
    setInputDict(elem);
    setOpenSuggestions(false);
  };

  const cleanedResults = (res: string) => {
    const [ci, st, co] = res.split(",");
    return `${ci} ( ${st}, ${co} )`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-500">Suggestions</CardTitle>
        <CardDescription>
          Select city which best matches your query.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Array.isArray(results) && (
          <div className="space-y-2 w-min">
            {results.map((elem: any) => (
              <Button
                variant="ghost"
                onClick={() => handleClick(elem)}
                key={elem.lat}
              >
                {cleanedResults(elem.city)}
              </Button>
            ))}
          </div>
        )}
        {/* <pre>{JSON.stringify(results)}</pre> */}
      </CardContent>
    </Card>
  );
}
