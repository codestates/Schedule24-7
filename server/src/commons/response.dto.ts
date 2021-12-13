// swagger 응답쪽 코드 속성 정의
export class ResponseDto {
  ok: boolean;
  data?: any;
  message?: string;
  error?: any;
  nTotal?: number;
}
