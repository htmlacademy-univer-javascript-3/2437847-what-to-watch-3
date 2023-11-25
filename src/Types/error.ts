export type ErrorType = {
  errorType: string;
  message: string;
  details: DetailsError[];
};

type DetailsError = {
  property: string;
  value: string;
  messages: string[];
};
