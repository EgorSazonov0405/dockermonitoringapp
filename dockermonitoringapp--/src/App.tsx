import React,{useState} from 'react';
import { useFetchContainers } from './hooks/useFetchContainers';
import ContainerList from './components/ContainerList';
import InputRow from './components/InputRow';

const App: React.FC = () => {
  const { containers, loading, error } = useFetchContainers(5000);
  const [data, setData] = useState<Entry[]>([]);

  const handleAdd = (newEntry: Entry) => {
      setData([...data, newEntry]);
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main_container">
      <h1 className="text-center">Docker Container Monitor</h1>
      <InputRow onAdd={handleAdd} />
            <div className="data-list">
                {data.map((entry, index) => (
                    <div key={index} className="data-entry">
                        <span>{entry.name}</span>
                        <span>{entry.ipAddress}</span>
                        <span>{entry.pingTime}</span>
                        <span>{entry.status}</span>
                    </div>
                ))}
            </div>
        <ContainerList containers={containers} />
    </div>
  );
};

export default App;