import React from 'react';
import { Loader } from '../Loader/Loader';

type Props = {
  filter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean; // Получаем состояние загрузки
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  isLoading,
}) => (
  <div>
    {isLoading ? (
      // Лоадер отображается вместо формы
      <div className="has-text-centered">
        <Loader />
      </div>
    ) : (
      // Форма фильтрации и поиска
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {searchQuery && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
        </p>
      </form>
    )}
  </div>
);
