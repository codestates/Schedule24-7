import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateConditionDto {
  @ApiProperty({ description: "conditionId" })
  conditionId: number;
  @IsString({ message: "conditionName의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "conditionName은 필수값입니다." })
  @ApiProperty({ description: "conditionName" })
  conditionName: string;
  @IsString({ message: "conditionDesc의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "conditionDesc은 필수값입니다." })
  @ApiProperty({ description: "conditionDesc" })
  conditionDesc: string;
  @IsString({ message: "target의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "target은 필수값입니다." })
  @ApiProperty({ description: "target" })
  target: string;
  @IsString({ message: "cycle의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "cycle은 필수값입니다." })
  @ApiProperty({ description: "cycle" })
  cycle: string;
  @IsInt({ message: "workId의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "workId은 필수값입니다." })
  @ApiProperty({ description: "workId" })
  workId: number;
  @IsString({ message: "operation의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "operation은 필수값입니다." })
  @ApiProperty({ description: "operation" })
  operation: string;
  @IsInt({ message: "value의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "value은 필수값입니다." })
  @ApiProperty({ description: "value" })
  value: number;
}
