type CheckIn = {
  userId: number;
  mood: number;
  note: string;
  createdAt: string;
};

type GetCheckInsResponseDto = CheckIn[];

export { type GetCheckInsResponseDto };
