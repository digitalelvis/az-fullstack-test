/**
 * Função que realiza o logout do usuário
 */
export const logout = (setUser: Function) => {
    // Limpar o localStorage
    localStorage.removeItem("user");
  
    // Atualizar o estado
    setUser(null);
  
    // Redirecionar o usuário para a página de login
    window.location.href = "/login";  // Ou usar React Router para redirecionamento
  };
  