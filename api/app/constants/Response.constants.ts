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
    code: "GET_CHANNELS_SUCCESSFULLY",
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
  updateChannel: {
    code: "UPDATE_CHANNEL_SUCCESSFULLY",
    message: "A channel was successfully updated.",
  },
  getSources: {
    code: "GET_SOURCES_SUCCESSFULLY",
    message: "The sources were successfully obtained.",
  },
  addSource: {
    code: "POST_ADD_SOURCE_SUCCESSFULLY",
    message: "A new source was successfully added.",
  },
  deleteSource: {
    code: "DELETE_SOURCE_SUCCESSFULLY",
    message: "A source was successfully deleted.",
  },
  getBases: {
    code: "GET_BASES_SUCCESSFULLY",
    message: "The bases were successfully obtained.",
  },
  addBase: {
    code: "POST_ADD_BASE_SUCCESSFULLY",
    message: "A new base was successfully added.",
  },
  updateBase: {
    code: "UPDATE_BASE_SUCCESSFULLY",
    message: "A base was successfully updated.",
  },
  deleteBase: {
    code: "DELETE_BASE_SUCCESSFULLY",
    message: "A base was successfully deleted.",
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
  source: {
    code: "NOT_FOUND_SOURCE",
    message: "The requested source was not found.",
  },
  base: {
    code: "NOT_FOUND_BASE",
    message: "The requested base was not found.",
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
  source: {
    code: "ALREADY_EXISTS_SOURCE",
    message: "This source already exists.",
  },
  base: {
    code: "ALREADY_EXISTS_BASE",
    message: "This base already exists.",
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
