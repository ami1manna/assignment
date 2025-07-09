import axios from "axios";
import { Employee } from "./types";

const API_BASE_URL = 'https://dummy.restapiexample.com/api/v1';

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const result = await axios.get<{ data: Employee[] }>(`${API_BASE_URL}/employees`);
    return result.data.data;
  } catch {
    // Optionally log error
    return [];
  }
};

export const fetchEmployeeById = async (id: number): Promise<Employee | null> => {
  try {
    const result = await axios.get<{ data: Employee }>(`${API_BASE_URL}/employee/${id}`);
    return result.data.data;
  } catch {
    // Optionally log error
    return null;
  }
}; 