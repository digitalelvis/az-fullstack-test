/**
 * Função que realiza o logout do usuário
 */
export const logout = (setUser: Function) => {
    // Limpar o localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
  
    // Atualizar o estado para remover os dados do usuário
    setUser({
      token: null,
      name: null,
      email: null,
      id: null,
    });
  
    // Redirecionar o usuário para a página de login
    window.location.href = "/login";  // Ou usar React Router para redirecionamento
  };
  