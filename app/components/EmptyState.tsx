"use client";

import { FileSearch } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-20 text-center">

      <div className="bg-cyan-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">

        <FileSearch
          size={40}
          className="text-cyan-400"
        />

      </div>

      <h2 className="text-4xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        {description}
      </p>

    </div>

  );

}