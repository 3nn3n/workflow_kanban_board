export type Id = string | number;

export type Box = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  boxId: Id;
  content: string;
};