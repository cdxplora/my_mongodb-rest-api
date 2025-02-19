import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb.js';

const logonUsers = new Map();

export const findOneUser = async (username) => {
  const db = getDB();
  return await db.collection('users').findOne({ username });
};

export const getAllData = async () => {
  const db = getDB();
  return await db.collection('data').find({}).toArray();
};

export const getDataById = async (id) => {
  const db = getDB();
  return await db.collection('data').findOne({ id });
};

export const getAllUsers = async () => {
  const db = getDB();
  return await db.collection('users').find({}).toArray();
};

export const addOneUser = async (username, password) => {
  const db = getDB();
  return await db.collection('users').insertOne({
    username,
    password
  });
};

export const addData = async ({ id, Firstname, Surname, userid }) => {
  const db = getDB();
  return await db.collection('data').insertOne({
    id,
    Firstname,
    Surname,
    userid
  });
};

export { logonUsers };