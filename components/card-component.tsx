import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerForm } from "@/components/input-forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReloadIcon } from "@radix-ui/react-icons";

export function CardWithDatePicker() {
  return (
    <Card className="col-span-2 grid items-start gap-6 lg:col-span-1">
      <CardHeader>
        <CardTitle>Create Choghadiya</CardTitle>
        <CardDescription>Please enter a date and city for Muhurat calculation.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="items-center gap-4">
          <DatePickerForm />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <SubmitButton loading={false} /> */}
        {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  );
}

export function CardWithForm() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="items-center gap-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

type SubmitButtonProps = { loading: boolean, history?: boolean };

export function SubmitButton({ loading, history }: SubmitButtonProps) {
  return (
    <>
      {loading && (
        <div className="flex justify-between">
          <Button disabled className="w-1/2">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          {/* <Button variant="outline" disabled={true} className="w-1/3">
            History
          </Button> */}
        </div>
      )}

      {!loading && (
        <div className="flex justify-between">
          <Button type="submit" className="w-1/2">
            Submit
          </Button>
          
          {/* <Button variant="outline" className="w-1/3">
            History
          </Button> */}
        </div>
      )}
    </>
  );
}
