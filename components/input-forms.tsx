"use client";

import { useChStore } from "@/app/store";
import { SubmitButton } from "@/components/card-component";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { InputGranular } from "@/types/store-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AutocompletePopover } from "./autocomplete";
import { Input } from "./ui/input";

const FormSchema = z.object({
  target: z.date({
    required_error: "A starting date is required.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
});

export function DatePickerForm() {
  // Setup Zustand for fetching

  const { fetchPredictionGranular, fetchAutocomplete, autocompleteResults } =
    useChStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [openSuggestions, setOpenSuggestions] = useState(true);
  const [inputDict, setInputDict] = useState<InputGranular>({
    city: "",
    date: "",
    lat: 0,
    lon: 0,
  });

  const handleInputChange = (e: any) => {
    setOpenSuggestions(true);
    // setInputValue(e.target.value);
    setInputDict((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(inputDict);
    if (inputDict.city.length >= 3) {
      try {
        fetchAutocomplete(inputDict.city);
      } catch (error) {
        console.error("Error fetching autocomplete results", error);
      }
      // handleAutocomplete(inputDict.city)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputDict]);

  const handleFetchPredictionGranular = async (
    inputCity: string,
    inputDate: string,
    lat: number,
    lon: number
  ) => {
    if (inputCity.length == 0) return alert("Todo input must not be empty");
    try {
      setLoading(true);
      const input = {
        date: inputDate,
        city: inputCity,
        lat: lat,
        lon: lon,
      };
      await fetchPredictionGranular(input);
    } catch (error) {
      console.error("Error creating prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  // setup Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    await handleFetchPredictionGranular(
      inputDict.city,
      data.target.toISOString().split("T")[0],
      inputDict.lat,
      inputDict.lon
    );

    toast({
      title: `City: ${String(data.city)}`,
      description: `Target Date: ${new Date(data.target).toLocaleDateString()}`,
      duration: 3000,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date for Prediction</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    // fromDate={fromDate}
                    // toDate={currentDate}
                    // disableNavigation
                    // disabled={(date) => date > new Date()}
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the root date to make muhurta predictions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          // defaultValue="Mumbai"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>City Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="mumbai"
                  {...field}
                  value={inputDict.city}
                  onChangeCapture={handleInputChange}
                />
              </FormControl>
              <div className="pt-2 absolute shadow-xl w-full">
                {inputDict.city.length >= 3 && openSuggestions && (
                  <AutocompletePopover
                    results={autocompleteResults}
                    // setInputValue={setInputValue}
                    setOpenSuggestions={setOpenSuggestions}
                    setInputDict={setInputDict}
                  />
                )}
              </div>
              <FormDescription>
                This is the city you have picked for predictions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={loading} />
      </form>
    </Form>
  );
}
