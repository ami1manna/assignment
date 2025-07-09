import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './types';
import { fetchEmployees } from './employeeApi';

// Async thunk for fetching employees
export const fetchEmployeesAsync = createAsyncThunk(
  'employee/fetchEmployees',
  async () => {
    const response = await fetchEmployees();
    return response;
  }
);

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  selectedEmployeeIds: number[];
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  selectedEmployeeIds: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      state.selectedEmployeeIds = state.selectedEmployeeIds.filter(id => id !== action.payload);
    },
    deleteSelectedEmployees: (state) => {
      state.employees = state.employees.filter(emp => !state.selectedEmployeeIds.includes(emp.id));
      state.selectedEmployeeIds = [];
    },
    toggleSelect: (state, action: PayloadAction<number>) => {
      if (state.selectedEmployeeIds.includes(action.payload)) {
        state.selectedEmployeeIds = state.selectedEmployeeIds.filter(id => id !== action.payload);
      } else {
        state.selectedEmployeeIds.push(action.payload);
      }
    },
    selectAll: (state) => {
      state.selectedEmployeeIds = state.employees.map(emp => emp.id);
    },
    clearSelection: (state) => {
      state.selectedEmployeeIds = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      });
  },
});

export const { deleteEmployee, deleteSelectedEmployees, toggleSelect, selectAll, clearSelection, clearError } = employeeSlice.actions;
export default employeeSlice.reducer; 