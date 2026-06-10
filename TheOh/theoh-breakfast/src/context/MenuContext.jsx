import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState({
    bases: [],
    addons: [],
    combos: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    
    const fetchMenuData = async () => {
      try {
        setIsLoading(true);
        const data = await api.fetchMenu();
        if (active) {
          setMenu({
            bases: data.bases || [],
            addons: data.addons || [],
            combos: data.combos || []
          });
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        if (active) {
          setError(err.message || 'Failed to load menu');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchMenuData();

    return () => {
      active = false;
    };
  }, []);

  const refreshMenu = async () => {
    try {
      setIsLoading(true);
      const data = await api.fetchMenu();
      setMenu({
        bases: data.bases || [],
        addons: data.addons || [],
        combos: data.combos || []
      });
      setError(null);
    } catch (err) {
      console.error("Failed to refresh menu:", err);
      setError(err.message || 'Failed to load menu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MenuContext.Provider value={{ menu, isLoading, error, refreshMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
