import api from "./api";

export interface ProofSession {
  email: string;
  password: string;
}

export const callLogin = async (data: ProofSession) => {
  try {
    const response = await api.post("/proof/session", data);
    return response.data;
  } catch (error: any) {
    // Verifica se existe uma resposta da API com mensagem de erro
    const errorMessage = error.response?.data?.message || "Erro desconhecido.";
  
    return { error: true, message: errorMessage };
  }
};
