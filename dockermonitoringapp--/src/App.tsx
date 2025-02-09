import React, { useState } from 'react';
import axios from 'axios';

interface PingRequest {
    ip: string;
    time: number;
}

interface PingResponse {
    ip: string;
    status: string;
}

const App: React.FC = () => {
    const [ip, setIp] = useState<string>('');
    const [time, setTime] = useState<number>(0);
    const [results, setResults] = useState<PingResponse[]>([]);

    const handlePing = async () => {
        try {
            const response = await axios.post<PingResponse[]>('http://localhost:8080/api/ping', [
                { ip, time },
            ]);
            setResults(response.data);
        } catch (error) {
            console.error('Error pinging IP:', error);
        }
    };

    return (
        <div>
            <h1>IP Pinger</h1>
            <input
                type="text"
                placeholder="Введите IP адрес"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
            />
            <input
                type="number"
                placeholder="Введите время пинга (мс)"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
            />
            <button onClick={handlePing}>Пинговать</button>

            <h2>Результаты:</h2>
            <ul>
                {results.map((result) => (
                    <li key={result.ip}>
                        {result.ip}: {result.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;