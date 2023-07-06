import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  searchQuery: string;
  onClearSearch: () => void;
}

const NoSearch: React.FC<Props> = ({ searchQuery, onClearSearch }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 max-w-sm">
      <Image
        src="/icons/featured-icon.png"
        width={50}
        height={50}
        alt="featured-icon"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="text-xl font-poppins font-semibold">No Blocs Found</div>
        <div className="text-sm font-spacegrotesk text-[#B0B0B0] text-center">
          Your search &quot;{searchQuery}&quot; did not match any Blocs. Please try again
          or create a new Bloc.
        </div>
      </div>
      <div className="flex gap-5">
        <button
          onClick={onClearSearch}
          className="bg-[#ffffff44] text-[#FFFFFFD9] font-spacegrotesk font-medium text-sm px-8 py-2 rounded-[4px] mt-4"
        >
          Clear Search
        </button>
        <button
          onClick={() => {
            router.push("/new/create");
          }}
          className="bg-[#0784C6] text-[#FFFFFFD9] font-spacegrotesk font-medium text-sm px-8 py-2 rounded-[4px] mt-4"
        >
          Create New Bloc
        </button>
      </div>
    </div>
  );
};

export default NoSearch;
