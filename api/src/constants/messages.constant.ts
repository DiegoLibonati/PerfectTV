import {
  MessagesSuccess,
  MessagesError,
  MessagesNot,
} from "@src/entities/constants";

export const MESSAGES_SUCCESS: MessagesSuccess = {
  addBase: "[Api] Base added.",
  addCategory: "[Api] Category added.",
  addChannel: "[Api] Channel added.",
  addSource: "[Api] Source added.",
  addType: "[Api] Type added.",
  deleteBase: "[Api] Base deleted.",
  deleteCategory: "[Api] Category deleted.",
  deleteChannel: "[Api] Channel deteled.",
  deleteSource: "[Api] Source deleted.",
  deleteType: "[Api] Type deleted.",
  getBases: "[Api] Bases delivered.",
  getCategories: "[Api] Categories delivered.",
  getChannel: "[Api] Channel delivered.",
  getChannelByNumber: "[Api] Channel delivered.",
  getChannelNumbers: "[Api] Channel numbers delivered.",
  getChannels: "[Api] Channels delivered.",
  getSources: "[Api] Sources delivered.",
  getTypes: "[Api] Types delivered.",
  updateBase: "[Api] Base updated.",
  updateChannel: "[Api] Channel updated.",
};

export const MESSAGES_NOT: MessagesNot = {
  foundRoute: "[Api] Route not found.",
  foundBase: "[Api] Base not found.",
  foundCategory: "[Api] Category not found.",
  foundChannel: "[Api] Channel not found.",
  foundSource: "[Api] Source not found.",
  foundType: "[Api] Type not found.",
  validFields: "[Api] Not valid fields.",
  validParams: "[Api] Not valid params.",
  validQueries: "[Api] Not valid queries.",
};

export const MESSAGES_ERROR: MessagesError = {
  generic: "[Api] Something went wrong!",
  itemAlreadyExistsInDatabase: "[Api] A item already exists in the database!",
  baseAlreadyExists: "[Api] A base already exists in the database!",
  categoryAlreadyExists: "[Api] A category already exists in the database!",
  channelAlreadyExists: "[Api] A channel already exists in the database!",
  sourceAlreadyExists: "[Api] A source already exists in the database!",
  typeAlreadyExists: "[Api] A type already exists in the database!",
};
