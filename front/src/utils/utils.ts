import { useCallback } from 'react';

export const useCurrency = () => {
  // Aqui você poderia obter a configuração de moeda de um contexto global ou estado
  const currencySymbol = 'R$';
  
  const format = useCallback((value: number | undefined | null): string => {
    if (value === undefined || value === null) {
      return `${currencySymbol} 0,00`;
    }
    
    return `${currencySymbol} ${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [currencySymbol]);

  return { format, currencySymbol };
};
