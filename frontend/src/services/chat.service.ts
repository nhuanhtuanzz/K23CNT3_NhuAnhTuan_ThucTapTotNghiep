import api from "./api";

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
}

export interface SendMessageResponse {
  answer: string;
  conversationId: string;
}

export const sendMessage = async (
  data: SendMessageRequest
): Promise<SendMessageResponse> => {
  const response = await api.post<SendMessageResponse>(
    "/chat",
    data
  );

  return response.data;
};