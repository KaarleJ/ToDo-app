import AppBar from "./components/AppBar";
import Paper from "./components/Paper";
import useAuth from "./hooks/useAuth";
import TodoTable from "./components/TodoTable";

function App() {
  const { user, loading, login, register, logOut } = useAuth();

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <AppBar
        user={user}
        login={login}
        loading={loading}
        register={register}
        logOut={logOut}
      />
      <Paper>
        {user ? (
          <TodoTable />
        ) : (
          <div className="flex flex-col justify-center h-5/6">
            <p className="text-3xl text-purple-900">Not logged in</p>
            <p className="text-xl text-purple-900">
              Click the login or register button in the top right corner of the
              screen to get started.
            </p>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default App;
