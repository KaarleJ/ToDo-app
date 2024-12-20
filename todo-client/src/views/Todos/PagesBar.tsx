import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useQueryParams from "@/hooks/useQueryParams";
import { resolveDisplayedPages } from "@/lib/utils";

export default function PagesBar({
  pages,
  first,
  last,
  number,
}: {
  pages: number;
  first: boolean;
  last: boolean;
  number: number;
}) {
  const { search, updateSearch } = useQueryParams();
  const page = Number(search.get("page")) || 1;
  const displayedPages = resolveDisplayedPages(pages, number);
  return (
    <Pagination className="absolute bottom-0 right-0">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={first}
            className="hover:cursor-pointer"
            onClick={() => updateSearch("page", String(page - 1))}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        {displayedPages.map((displayedPage) => (
          <PaginationItem key={displayedPage}>
            <PaginationLink
              className="hover:cursor-pointer"
              isActive={displayedPage === number}
              size="icon"
              onClick={() => updateSearch("page", String(displayedPage))}
            >
              {displayedPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={last}
            className="hover:cursor-pointer"
            onClick={() => updateSearch("page", String(page + 1))}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
