import { create } from "zustand";

interface filterType {
    product_type?: string
    search?: string
    sorting?: string
}
interface filterState {
    filter: filterType
    count: 0
}
interface filterActions {
    //setFilter: (property: keyof filterType, value: string) => void
    setFilter: (filter: Partial<filterType>) => void
    setCount: (count: number) => void
    clearFilter: () => void
}
const defaultState = { product_type: "", search: "", sorting: "contract" }
const filterStore = create<filterState & filterActions>((set) => ({
    filter: defaultState,
    count: 0,
    setFilter: (filter) => {
        set((state) => ({
            filter: {
                ...state.filter,
                ...filter
            }
        }))
    },
    setCount: (count) => {
        set((state) => ({
            filter: {
                ...state.filter,
                total: count
            }
        }));
    },
    clearFilter: () => {set({filter: defaultState})}
}));
  
export default filterStore