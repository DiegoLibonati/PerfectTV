export type MessagesSuccess = {};

export type MessagesNot = {
  foundRoute: string;
};

export type MessagesError = {
  generic: string;
};

export type CodesSuccess = {};

export type CodesNot = {
  foundRoute: "NOT_FOUND_ROUTE";
};

export type CodesError = {
  generic: "ERROR_GENERIC";
};
