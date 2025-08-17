import {
  collection,
  limit,
  orderBy,
  query,
  Query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type { CollectionOptions } from "../types";
import type { QueryDocumentSnapshot } from "firebase/firestore";

export const getQuery = (
  path: string,
  options?: CollectionOptions,
  lastDocRef?: QueryDocumentSnapshot | null,
  paginate?: boolean
): Query => {
  let q = collection(db, path) as Query;

  if (options?.queries) {
    options.queries.forEach(({ attribute, operator, value, isDate }) => {
      if (isDate) value = Timestamp.fromDate(new Date(value as string));
      q = query(q, where(attribute, operator, value));
    });
  }

  if (options?.sort) {
    const { attribute, direction } = options.sort;
    q = query(q, orderBy(attribute, direction));
  }

  if (options?.limit && paginate) {
    q = query(q, limit(options.limit));
  }

  if (paginate && lastDocRef) {
    q = query(q, startAfter(lastDocRef));
  }

  return q;
};
