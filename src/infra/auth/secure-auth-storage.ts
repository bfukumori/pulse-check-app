import * as SecureStore from 'expo-secure-store';

export class SecureAuthStorage {
  private ACCESS_TOKEN = 'accessToken';

  async getAccessToken() {
    try {
      const token = await SecureStore.getItemAsync(this.ACCESS_TOKEN);

      return token;
    } catch (error) {
      console.error('Erro ao recuperar accessToken do SecureStore:', error);
      return null;
    }
  }

  async saveAccessToken(token: string) {
    try {
      await SecureStore.setItemAsync(this.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Erro ao salvar accessToken no SecureStore:', error);
    }
  }

  async clear() {
    try {
      await SecureStore.deleteItemAsync(this.ACCESS_TOKEN);
    } catch (error) {
      console.error('Erro ao limpar token do SecureStore:', error);
    }
  }
}
