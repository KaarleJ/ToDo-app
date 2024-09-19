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
import { Label } from "@/components/ui/label";

export default function TopMenu() {
  const revalidator = useRevalidator();
  const [search, setSearch] = useSearchParams();

  function MenuBar() {
    const updateSearch = (key: string, value: string) => {
      const newParams = new URLSearchParams(search);
      newParams.set(key, value);
      setSearch(newParams);
      revalidator.revalidate();
    };
    return (
      <Menubar className="ml-4">
        <MenubarMenu>
          <MenubarTrigger className="w-18">Show</MenubarTrigger>
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
          <MenubarTrigger className="w-18">Sort</MenubarTrigger>
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
    );
  }

  return (
    <div className="w-full border-b h-min px-4 py-2 flex items-center justify-between rounded-t-md">
      <div className="w-52">
        <h3>Todos</h3>
        <p className="brightness-75 text-sm">Manage your tasks</p>
      </div>
      <div className="flex w-2/3 ml-4 items-center">
        <Input placeholder="filter tasks" />
        <Button type="submit" className="mx-2">
          Search
        </Button>
        <MenuBar />
      </div>
    </div>
  );
}
