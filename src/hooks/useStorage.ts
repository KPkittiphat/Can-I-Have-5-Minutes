export const useStorage = () => {
  const saveUser = (name: string, age: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ci5m_user', JSON.stringify({ name, age }));
    }
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('ci5m_user');
      return data ? JSON.parse(data) : null;
    }
    return null;
  };

  const clearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ci5m_user');
    }
  };

  return { saveUser, getUser, clearAll };
};