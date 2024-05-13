"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPosts() {
  return (
    <div>
      <section className="w-full py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Últimos Posts
          </h2>
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
          {new Array(15).fill(null).map((_, index) => (
            <div
              className="relative group flex flex-col items-start justify-start gap-4"
              key={index}
            >
              <div className="flex flex-col items-start justify-start">
                <Skeleton className="rounded-lg w-full aspect-[3/2] h-[168px]" />
                <div className="flex flex-col items-start justify-start w-full gap-2 mt-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
