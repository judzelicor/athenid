import { create } from 'zustand';

const useActiveView = create((set) => ({
    activeView: '/feed', 
    changeActiveView: (view) => set({ activeView: view }),
}));

export default useActiveView;
