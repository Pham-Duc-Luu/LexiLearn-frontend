import FilterBlock from "./FilterBlock.component";
import PaginationBlock from "./PaginationBlock.component";
import SearchInput from "./SearchInput.component";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" col-span-9 p-4 flex flex-col">
        <SearchInput></SearchInput>
        <FilterBlock></FilterBlock>
        <div className=" overflow-y-scroll flex-1 relative">
          <div className=" absolute w-full gap-2 flex flex-col p-2 justify-center items-center">
            {children}
          </div>
        </div>
        <div className="w-full m-2 flex justify-center items-center">
          <PaginationBlock></PaginationBlock>
        </div>
      </div>
    </>
  );
}
