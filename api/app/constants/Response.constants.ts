import { ResponseConstants } from "@app/entities/constants";

export const responseSuccess: ResponseConstants = {
  alive: {
    code: "GET_ALIVE_SUCCESSFULLY",
  },
  getTypes: {
    code: "GET_TYPES_SUCCESSFULLY",
  },
  addType: {
    code: "POST_ADD_TYPE_SUCCESSFULLY",
  },
  deleteType: {
    code: "DELETE_TYPE_SUCCESSFULLY",
  },
  getCategories: {
    code: "GET_CATEGORIES_SUCCESSFULLY",
  },
  addCategory: {
    code: "POST_ADD_CATEGORY_SUCCESSFULLY",
  },
  deleteCategory: {
    code: "DELETE_CATEGORY_SUCCESSFULLY",
  },
  getChannels: {
    code: "GET_CHANNELS_SUCCESSFULLY",
  },
  getChannel: {
    code: "GET_CHANNEL_SUCCESSFULLY",
  },
  addChannel: {
    code: "POST_ADD_CHANNEL_SUCCESSFULLY",
  },
  deleteChannel: {
    code: "DELETE_CHANNEL_SUCCESSFULLY",
  },
  updateChannel: {
    code: "UPDATE_CHANNEL_SUCCESSFULLY",
  },
  getSources: {
    code: "GET_SOURCES_SUCCESSFULLY",
  },
  addSource: {
    code: "POST_ADD_SOURCE_SUCCESSFULLY",
  },
  deleteSource: {
    code: "DELETE_SOURCE_SUCCESSFULLY",
  },
  getBases: {
    code: "GET_BASES_SUCCESSFULLY",
  },
  addBase: {
    code: "POST_ADD_BASE_SUCCESSFULLY",
  },
  updateBase: {
    code: "UPDATE_BASE_SUCCESSFULLY",
  },
  deleteBase: {
    code: "DELETE_BASE_SUCCESSFULLY",
  },
  getNumbers: {
    code: "GET_NUMBERS_SUCCESSFULLY",
  },
};

export const responseNotFound: ResponseConstants = {
  type: {
    code: "NOT_FOUND_TYPE",
  },
  category: {
    code: "NOT_FOUND_CATEGORY",
  },
  channel: {
    code: "NOT_FOUND_CHANNEL",
  },
  route: {
    code: "NOT_FOUND_ROUTE",
  },
  source: {
    code: "NOT_FOUND_SOURCE",
  },
  base: {
    code: "NOT_FOUND_BASE",
  },
};

export const responseAlreadyExists: ResponseConstants = {
  type: {
    code: "ALREADY_EXISTS_TYPE",
  },
  category: {
    code: "ALREADY_EXISTS_CATEGORY",
  },
  channel: {
    code: "ALREADY_EXISTS_CHANNEL",
  },
  source: {
    code: "ALREADY_EXISTS_SOURCE",
  },
  base: {
    code: "ALREADY_EXISTS_BASE",
  },
};

export const responseNotValid = {
  fields: {
    code: "NOT_VALID_FIELDS",
  },
  params: {
    code: "NOT_VALID_PARAMS",
  },
  queries: {
    code: "NOT_VALID_QUERIES",
  },
};
