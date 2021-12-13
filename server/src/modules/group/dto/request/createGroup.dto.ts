import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, IsNotEmpty } from "class-validator";

class Work {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "작업 아이디",
  })
  readonly workId: number;

  @ApiProperty({
    example: "Day",
    description: "작업명",
  })
  @IsString({ message: "workName의 타입이 올바르지 않습니다." })
  readonly workName: string;

  @ApiProperty({
    example: 3,
    description: "인원수",
  })
  @IsNumber()
  readonly limit: number;
}

export class CreateGroupReqDto {
  @ApiProperty({
    example: "당직1팀",
    description: "그룹명",
    required: true,
  })
  @IsString({ message: "groupName의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "groupName은 필수값입니다." })
  readonly groupName: string;

  @ApiProperty({
    example: "당직1팀에 대한 그룹명단",
    description: "그룹 부가 설명",
    required: true,
  })
  @IsString({ message: "groupDesc의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "groupDesc는 필수값입니다." })
  readonly groupDesc: string;

  @ApiProperty({
    example: "💡",
    description: "그룹이모지",
    required: true,
  })
  @IsString({ message: "groupEmoji의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "groupEmoji는 필수값입니다." })
  readonly groupEmoji: string;

  @ApiProperty({
    type: () => [Work],
  })
  @IsArray({ message: "works의 타입이 올바르지 않습니다." })
  readonly works: Work[];
}
