import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Всеобщее состояние загрузки
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);   // Начинаем загрузку
    setError(null);        // Сбрасываем возможные ошибки

    getUser(todo.userId)
      .then((fetchedUser) => {
        setUser(fetchedUser);   // Успешная загрузка пользователя
      })
      .catch(() => {
        setError('Failed to load user'); // Если ошибка при загрузке
      })
      .finally(() => {
        setIsLoading(false);  // Завершаем процесс загрузки (в любом случае)
      });
  }, [todo.userId]);  // Загрузка при изменении todo.userId

  if (isLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" onClick={onClose} />
        <Loader />
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {error ? (  // Показываем ошибку, если загрузка не удалась
        <div className="modal-card">
          <header className="modal-card-head">
            <button type="button" className="delete" onClick={onClose} data-cy="modal-close" />
          </header>

          <div className="modal-card-body">
            <p>{error}</p>
          </div>
        </div>
      ) : (  // Если данные успешно загружены
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>
            <button type="button" className="delete" onClick={onClose} data-cy="modal-close" />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`} className="has-text-link">
                  {user.name}
                </a>
              ) : (
                <></>  // Пустое место, если данных нет
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
