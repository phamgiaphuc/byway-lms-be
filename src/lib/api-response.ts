export class ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T, message: string = "success") {
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 300;
  }
}
