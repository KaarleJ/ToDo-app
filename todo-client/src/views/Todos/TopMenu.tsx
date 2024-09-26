import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRevalidator, useSearchParams } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Settings2 as Filter, Search } from "lucide-react";
import AddTodoModal from "./AddTodoModal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function TopMenu() {
  const revalidator = useRevalidator();
  const [search, setSearch] = useSearchParams();

  function updateSearch(key: string, value: string) {
    const newParams = new URLSearchParams(search);
    newParams.set(key, value);
    setSearch(newParams);
    revalidator.revalidate();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateSearch("search", e.currentTarget.search.value);
    revalidator.revalidate();
  }

  function MenuBar() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md hover:bg-accent border p-2">
          <Filter className="text-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="w-16">Show</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => updateSearch("show", "all")}>
                  All
                </MenubarItem>
                <MenubarItem onClick={() => updateSearch("show", "finished")}>
                  Finished
                </MenubarItem>
                <MenubarItem onClick={() => updateSearch("show", "unfinished")}>
                  Unfinished
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="w-16">Sort</MenubarTrigger>
              <MenubarContent>
                <Label className="px-2">Deadline</Label>
                <MenubarSeparator />
                <MenubarItem onClick={() => updateSearch("sort", "asc")}>
                  Ascending
                </MenubarItem>
                <MenubarItem onClick={() => updateSearch("sort", "desc")}>
                  Descending
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  function SearchBar() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
      return (
        <form onSubmit={handleSubmit} className="flex">
          <Input name="search" placeholder="filter task" />
          <Button
            type="submit"
            className="ml-2 border shadow-sm"
            variant="secondary"
          >
            Search
          </Button>
        </form>
      );
    } else {
      return (
        <>
        <Input name="search" placeholder="filter task" />
        <Button className="border shadow-sm p-2" variant="secondary">
          <Search size={26} />
        </Button>
        </>
        
      );
    }
  }

  return (
    <div className="w-full border-b h-min px-4 py-2 flex items-center justify-between rounded-t-md">
      <div className="w-52">
        <h3>Todos</h3>
        <p className="brightness-75 text-sm">Manage your tasks</p>
      </div>
      <div className="flex w-2/3 ml-4 justify-end gap-2 items-center">
        <MenuBar />
        <SearchBar />
        <div className="ml-2">
          <AddTodoModal />
        </div>
      </div>
    </div>
  );
}
