/**
 * Converter uma data em uma string de data localizada
 * @param date Data em formato de string a ser convertido
 * @returns Retorna string localizada de data ou nulo caso ocorra erro
 */
export const getLocaleDateString = (date: string): string | null => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  } catch (error) {
    return null;
  }
};