import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader/Loader'; // Загрузка компонента Loader
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleShowDetails = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) {
      return false;
    }

    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isLoading={isLoading} // Передаем состояние загрузки в TodoFilter
              />
            </div>

            {/* Отображаем лоадер, если идет загрузка */}
            {isLoading ? (
              <div className="has-text-centered">
                <Loader />
              </div>
            ) : (
              // Todo List, только если есть данные
              filteredTodos.length > 0 && (
                <div className="block">
                  <TodoList
                    todos={filteredTodos}
                    onShowDetails={handleShowDetails}
                    selectedTodo={selectedTodo}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
