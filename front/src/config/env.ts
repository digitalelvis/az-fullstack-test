// Este arquivo irá facilitar e centralizar o acesso as variáveis de ambiente.
export const config = {
    defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY || 'BRL',
    defaultLocale: process.env.REACT_APP_DEFAULT_LOCALE || 'pt-BR',
  };
  