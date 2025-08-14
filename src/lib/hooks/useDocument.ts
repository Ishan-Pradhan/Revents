import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { setDocuments, setError, setLoading } from "../firebase/firestoreSlice";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { convertTimestamps } from "../util/util";
import { useCallback, useRef, useSyncExternalStore } from "react";

type Options = {
  path: string;
  id?: string;
  listen?: boolean;
};

export const useDocument = <T extends DocumentData>({
  path,
  id,
  listen = true,
}: Options) => {
  const dispatch = useAppDispatch();
  const documentData = useAppSelector((state) =>
    id ? (state.firestore.documents[path]?.[id] as T) : undefined
  );
  const loading = useAppSelector((state) => state.firestore.loading);
  const hasSetLoading = useRef(false);
  const loadedInitial = useRef(false);

  const subscribeToDocument = useCallback(() => {
    if (!listen || !id) return () => {}; //no-op

    if (!hasSetLoading.current) {
      dispatch(setLoading(true));
      hasSetLoading.current = true;
    }
    const docRef = doc(db, path, id);
    const unsubscibe = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          dispatch(setLoading(false));
          dispatch(setError("Document doesn't exists"));
          toast.error("Document doesn't exists");
          return;
        }

        const converted = convertTimestamps(snapshot.data() as T);
        dispatch(
          setDocuments({
            path,
            id,
            data: { id: snapshot.id, ...(converted as T) },
          })
        );
        dispatch(setLoading(false));
        loadedInitial.current = true;
      },
      (error) => {
        console.log(error);
        dispatch(setError(error.message));
        toast.error(error.message);
        loadedInitial.current = true;
      }
    );
    return () => {
      unsubscibe();
    };
  }, [dispatch, path, listen, id]);

  useSyncExternalStore(subscribeToDocument, () => documentData);
  return { data: documentData, loading, loadedInitial: loadedInitial.current };
};
