import React from 'react';
import { useFetchContainers } from './hooks/useFetchContainers';
import ContainerList from './components/ContainerList';


const App: React.FC = () => {
  // Используем хук для получения контейнеров с интервалом 5 секунд
  const { containers, loading, error } = useFetchContainers(5000);

  // Обработка состояния загрузки
  if (loading) return <div>Loading...</div>;

  // Обработка ошибок
  if (error) return <div>Error: {error}</div>;

  // Основной интерфейс приложения
  return (
    <div className="container mt-5">
      <h1 className="text-center">Docker Container Monitor</h1>
      <ContainerList containers={containers} />
    </div>
  );
};

export default App;