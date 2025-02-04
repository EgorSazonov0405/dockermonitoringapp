import axios from 'axios';
import { Container } from './types/Container';


export const fetchContainers = async (): Promise<Container[]> => {
  try {
    const response = await axios.get(`https://studious-lamp-r57vw9r555jcxvwp-8080.app.github.dev/containers`);
    if (response.data.error) {
      throw new Error(response.data.error.error_msg);
    }
    const containers = response.data.map((container: Omit<Container, 'backend_status'>) => ({
      ...container,
      backend_status: response.statusText,
    }));
    console.log(containers);
    return containers;
  } catch (error) {
    console.error('Ошибка получения:', error);
    return [];
  }
};