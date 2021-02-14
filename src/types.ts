export type OptionType = {
  value: string;
  answer: boolean;
};

export type QuizQuestionType = { id: string; question: string; options: OptionType[] };

export type QuizType = {
  id: string;
  name: string;
  quiz: QuizQuestionType[];
};

export type QuizHistory = {
  id: string;
  name: string;
  score: number;
  total: number;
  time: Date;
};

export type Answer = {
  id: string;
  answer?: string;
  value: string;
};
