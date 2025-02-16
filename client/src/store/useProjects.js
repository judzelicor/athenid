import { create } from 'zustand';

const useProjects = create((set) => ({
    projects: [], 
    setProjects: (projects) => set({ projects }),
}));

export default useProjects;
