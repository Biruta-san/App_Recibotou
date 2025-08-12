/**
 * Converter uma string em um inteiro
 * @param value Número em formato de string a ser convertido para inteiro
 * @returns Retorna o valor em formato de número ou 0 caso ocorra erro 
 */
export const getIntNumber = (value: string): number => {
  try {
    return parseInt(value, 10);
  } catch (error) {
    return 0;
  }
};