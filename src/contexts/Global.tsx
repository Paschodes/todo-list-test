import React, {
  createContext,
  useContext,
  Context,
  //   useEffect,
  useState,
} from "react";

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}

interface DefaultTodo {
  todos: ITodo[];
  addTodo?: (todo: ITodo) => void;
  removeTodo?: (todoId: number) => void;
  toggleTodo?: (todoId: number) => void;
}

const GlobalContext: Context<DefaultTodo> = createContext<DefaultTodo>({
  todos: [],
});

export const useGlobal = (): DefaultTodo => useContext(GlobalContext);

const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const addTodo = (todo: ITodo): void => {
    setTodos((oldTodo) => [...oldTodo, todo]);
  };

  const removeTodo = (todoId: number): void => {
    setTodos((oldTodo) => oldTodo.filter((t) => t.id !== todoId));
  };

  const toggleTodo = (todoId: number): void => {
    setTodos((oldTodo) =>
      oldTodo.map((t) =>
        t.id === todoId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <GlobalContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
