//@ts-check
import createError from 'http-errors';
import validator from '@middy/validator';
import commonMiddleware from '../lib/commonMiddleware';
import schema from '../lib/schemas/schema';
import { getOneItem, saveItem } from '../lib/awsDynamoDB';
import { v4 as uuid } from 'uuid';

async function handlerGetResource(event, context) {
  const { id } = event.pathParameters;
  let resource;
  try {
    resource = await getOneItem(process.env.TABLE_NAME,id);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  if (!resource) {
    throw new createError.NotFound(`resource with ID "${id}" not found!`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(resource),
  };
}

export function buildNewRecord(id,text){
  return  {
    id:id,
    text
  };
}


async function handlerPostResource(event, context) {
  const { text } = event.body;
  let resource = buildNewRecord(uuid(),text);
  try {
    await saveItem(process.env.TABLE_NAME,resource);
  } catch(error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(resource),
  };
}
  
export const handlerGetRecord = commonMiddleware(handlerGetResource).use(validator({ inputSchema:schema  }));
export const handlerPostRecord = commonMiddleware(handlerPostResource).use(validator({ inputSchema:schema  }));