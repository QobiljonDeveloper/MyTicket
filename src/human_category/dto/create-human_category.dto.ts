export class CreateHumanCategoryDto {
  id: number;
  name: string;
  start_age: number;
  finish_age: number;
  gender: "male" | "female" | "other";
}
