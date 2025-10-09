import {
  MessagesSuccess,
  MessagesError,
  MessagesNot,
} from "@src/entities/constants";

export const MESSAGES_SUCCESS: MessagesSuccess = {};

export const MESSAGES_NOT: MessagesNot = {
  foundRoute: "[GraphQL] Route not found.",
};

export const MESSAGES_ERROR: MessagesError = {
  generic: "[GraphQL] Something went wrong!",
};
