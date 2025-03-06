import { ResponseConstants } from "@app/entities/constants";

export const responseSuccess: ResponseConstants = {
  alive: {
    code: "GET_ALIVE_SUCCESSFULLY",
    message: "API Working.",
  },
  getTypes: {
    code: "GET_TYPES_SUCCESSFULLY",
    message: "The types were successfully obtained.",
  },
  addType: {
    code: "POST_ADD_TYPE_SUCCESSFULLY",
    message: "A new type was successfully added.",
  },
  deleteType: {
    code: "DELETE_TYPE_SUCCESSFULLY",
    message: "A type was successfully deleted.",
  },
  getCategories: {
    code: "GET_CATEGORIES_SUCCESSFULLY",
    message: "The categories were successfully obtained.",
  },
  addCategory: {
    code: "POST_ADD_CATEGORY_SUCCESSFULLY",
    message: "A new category was successfully added.",
  },
  deleteCategory: {
    code: "DELETE_CATEGORY_SUCCESSFULLY",
    message: "A category was successfully deleted.",
  },
  getChannels: {
    code: "GET_CHANNEL_SUCCESSFULLY",
    message: "The channels were successfully obtained.",
  },
  addChannel: {
    code: "POST_ADD_CHANNEL_SUCCESSFULLY",
    message: "A new channel was successfully added.",
  },
  deleteChannel: {
    code: "DELETE_CHANNEL_SUCCESSFULLY",
    message: "A channel was successfully deleted.",
  },
};

export const responseNotFound: ResponseConstants = {
  type: {
    code: "NOT_FOUND_TYPE",
    message: "The requested type was not found.",
  },
  category: {
    code: "NOT_FOUND_CATEGORY",
    message: "The requested category was not found.",
  },
  channel: {
    code: "NOT_FOUND_CHANNEL",
    message: "The requested channel was not found.",
  },
  route: {
    code: "NOT_FOUND_ROUTE",
    message: "The requested route was not found.",
  },
};

export const responseAlreadyExists: ResponseConstants = {
  type: {
    code: "ALREADY_EXISTS_TYPE",
    message: "This type already exists.",
  },
  category: {
    code: "ALREADY_EXISTS_CATEGORY",
    message: "This category already exists.",
  },
  channel: {
    code: "ALREADY_EXISTS_CHANNEL",
    message: "This channel already exists.",
  },
};

export const responseNotValid = {
  fields: {
    code: "NOT_VALID_FIELDS",
    message: "You must enter valid fields.",
  },
  params: {
    code: "NOT_VALID_PARAMS",
    message: "You must enter valid params.",
  },
};
