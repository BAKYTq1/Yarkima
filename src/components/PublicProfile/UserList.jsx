import { useEffect, useState } from "react";
import { userService } from "../../firebase";  // Импортируем сервис для пользователей

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAll();
        setUsers(usersData);  // Сохраняем пользователей в state
        setLoading(false);  // Останавливаем загрузку
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    fetchUsers();  // Загружаем пользователей при монтировании компонента
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Список пользователей</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              {/* Отображаем другие данные пользователя */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Пользователи не найдены</p>
      )}
    </div>
  );
};

export default UsersList;
