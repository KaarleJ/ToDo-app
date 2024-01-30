import AppBar from "./components/AppBar";
import Paper from "./components/Paper";
import useTodos from "./hooks/useTodos";
import TodoTable from "./components/TodoTable";


function App() {
  const { user, todos } = useTodos();
  
  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <AppBar />
      <Paper>
        {user ? <TodoTable todos={todos}/> : <>Not logged in</>}
      </Paper>
    </div>
  );
}

export default App;
