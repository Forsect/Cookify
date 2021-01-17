import { AxiosPromise } from "axios";

class RequestHelper {
  public async handleAnyRequest<TResponse>(fetchMethod: () => AxiosPromise<TResponse>): Promise<TResponse | null> {
    return this.handle<TResponse>(async () => {
      const response = await fetchMethod();

      return response.data;
    });
  }

  private async handle<T>(method: () => Promise<T>) {
    return await method();
  }
}

export default new RequestHelper();
