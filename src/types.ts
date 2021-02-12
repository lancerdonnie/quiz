export type OptionType = {
  value: string;
  answer: boolean;
};

export type QuizQuestionType = { id: string; name: string; options: OptionType[] };

export type QuizType = {
  id: string;
  name: string;
  quiz: QuizQuestionType[];
};
