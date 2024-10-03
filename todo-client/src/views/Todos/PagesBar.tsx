import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useQueryParams from "@/hooks/useQueryParams";

export default function PagesBar() {
  const { search, updateSearch } = useQueryParams();
  const page = Number(search.get("page")) || 1;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => updateSearch("page", String(page - 1))}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => updateSearch("page", String(page + 1))}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
