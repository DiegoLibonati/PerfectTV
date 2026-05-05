import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

import type { GraphQLFieldConfigMap } from "graphql";

import TypeType from "@/schemas/types/type.type";
import CategoryType from "@/schemas/types/category.type";
import SourceType from "@/schemas/types/source.type";

const ChannelType = new GraphQLObjectType({
  name: "ChannelType",
  fields: (): GraphQLFieldConfigMap<unknown, unknown> => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    thumbUrl: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    urlRest: { type: GraphQLString },
    number: { type: new GraphQLNonNull(GraphQLInt) },
    idType: { type: new GraphQLNonNull(GraphQLInt) },
    idCategory: { type: new GraphQLNonNull(GraphQLInt) },
    idSource: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: new GraphQLNonNull(TypeType) },
    category: { type: new GraphQLNonNull(CategoryType) },
    source: { type: new GraphQLNonNull(SourceType) },
  }),
});

export default ChannelType;
