export default function TodosSkeleton() {
  return (
    <div>
      <div className="w-full border-b h-min px-4 py-2 flex items-center justify-between rounded-t-md">
        <div>
          <h3>Todos</h3>
          <p className="brightness-75 text-sm">Manage your tasks</p>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="bg-muted animate-pulse rounded-md w-72 h-8"></div>
          <div className="bg-muted animate-pulse rounded-md w-24 h-8"></div>
        </div>
      </div>
      <div className="p-2">
        <div className="w-full h-10 bg-muted animate-pulse rounded-md my-4"></div>
        <div className="w-full h-10 bg-muted animate-pulse rounded-md my-4"></div>
        <div className="w-full h-10 bg-muted animate-pulse rounded-md my-4"></div>
        <div className="w-full h-10 bg-muted animate-pulse rounded-md my-4"></div>
        <div className="w-full h-10 bg-muted animate-pulse rounded-md my-4"></div>
        <div className="w-full h-10 bg-muted animate-pulse rounded-md my-4"></div>
      </div>
    </div>
  );
}
