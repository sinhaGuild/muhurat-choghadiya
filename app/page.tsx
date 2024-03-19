"use client";

import { useChStore } from "@/app/store";
import { CardWithDatePicker } from "@/components/card-component";
import { SinglePrediction } from "@/components/prediction-container";
import Head from "next/head";

export default function Home() {
  const prediction = useChStore((state) => state.output);

  return (
    <main>
      <>
        <Head>
          <title>Choghadiya</title>
          <meta
            name="description"
            content="Choghadiya calculation refers to an auspicious period of 24 mins"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-wider sm:text-3xl md:text-5xl lg:text-6xl">
              CHOGAHADIYA
            </h1>
            <p className="text-md text-slate-700 dark:text-slate-400 sm:text-md">
              Choghadiya (Chogaḍīā) refers to an auspicious period of
              twenty-four minutes.Cho-ghadiya means four ghadi which totals to
              96 minutes.
            </p>
          </div>
          <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
            <CardWithDatePicker />
            {prediction && <SinglePrediction prediction={prediction} />}
          </div>
        </section>
      </>
    </main>
  );
}
