export type MessagesSuccess = {
  getTypes: string;
  addType: string;
  deleteType: string;
  getCategories: string;
  addCategory: string;
  deleteCategory: string;
  getChannels: string;
  getChannel: string;
  updateChannel: string;
  addChannel: string;
  deleteChannel: string;
  getChannelNumbers: string;
  getChannelByNumber: string;
  getSources: string;
  addSource: string;
  deleteSource: string;
  getBases: string;
  addBase: string;
  updateBase: string;
  deleteBase: string;
};

export type MessagesNot = {
  foundRoute: string;
  foundType: string;
  foundCategory: string;
  foundChannel: string;
  foundSource: string;
  foundBase: string;
  validFields: string;
  validParams: string;
  validQueries: string;
};

export type MessagesError = {
  generic: string;
  itemAlreadyExistsInDatabase: string;
  typeAlreadyExists: string;
  categoryAlreadyExists: string;
  channelAlreadyExists: string;
  sourceAlreadyExists: string;
  baseAlreadyExists: string;
};

export type CodesSuccess = {
  getTypes: "SUCCESS_GET_TYPES";
  addType: "SUCCESS_ADD_TYPE";
  deleteType: "SUCCESS_DELETE_TYPE";
  getCategories: "SUCCESS_GET_CATEGORIES";
  addCategory: "SUCCESS_ADD_CATEGORY";
  deleteCategory: "SUCCESS_DELETE_CATEGORY";
  getChannels: "SUCCESS_GET_CHANNELS";
  getChannel: "SUCCESS_GET_CHANNEL";
  updateChannel: "SUCCESS_UPDATE_CHANNEL";
  addChannel: "SUCCESS_ADD_CHANNEL";
  deleteChannel: "SUCCESS_DELETE_CHANNEL";
  getChannelNumbers: "SUCCESS_GET_CHANNEL_NUMBERS";
  getChannelByNumber: "SUCCESS_GET_CHANNEL_BY_NUMBER";
  getSources: "SUCCESS_GET_SOURCES";
  addSource: "SUCCESS_ADD_SOURCE";
  deleteSource: "SUCCESS_DELETE_SOURCE";
  getBases: "SUCCESS_GET_BASES";
  addBase: "SUCCESS_ADD_BASE";
  updateBase: "SUCCESS_UPDATE_BASE";
  deleteBase: "SUCCESS_DELETE_BASE";
};

export type CodesNot = {
  foundRoute: "NOT_FOUND_ROUTE";
  foundType: "NOT_FOUND_TYPE";
  foundCategory: "NOT_FOUND_CATEGORY";
  foundChannel: "NOT_FOUND_CHANNEL";
  foundSource: "NOT_FOUND_SOURCE";
  foundBase: "NOT_FOUND_BASE";
  validFields: "NOT_VALID_FIELDS";
  validParams: "NOT_VALID_PARAMS";
  validQueries: "NOT_VALID_QUERIES";
};

export type CodesError = {
  generic: "ERROR_GENERIC";
  itemAlreadyExistsInDatabase: "ERROR_ITEM_ALREADY_EXISTS_IN_DATABASE";
  typeAlreadyExists: "ERROR_TYPE_ALREADY_EXISTS";
  categoryAlreadyExists: "ERROR_CATEGORY_ALREADY_EXISTS";
  channelAlreadyExists: "ERROR_CHANNEL_ALREADY_EXISTS";
  sourceAlreadyExists: "ERROR_SOURCE_ALREADY_EXISTS";
  baseAlreadyExists: "ERROR_BASE_ALREADY_EXISTS";
};
