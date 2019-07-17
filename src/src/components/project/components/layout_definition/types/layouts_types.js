import { NAMESPACE_MODULE } from '../constant';
const NAME_FUNCION = `${NAMESPACE_MODULE}_LIST`;

export const FETCHING = `${NAME_FUNCION}_FETCHING`;
export const RECEIVE = `${NAME_FUNCION}_RECEIVE`;
export const DID_INVALIDATION = `${NAME_FUNCION}_DID_INVALIDATION`;
export const RESET = `${NAME_FUNCION}_RESET`;
export const SELECT = `${NAME_FUNCION}_SELECT`;

export const DELETING = `${NAME_FUNCION}_DELETING`;
export const DELETE_FAILED = `${NAME_FUNCION}_DELETE_FAILED`;
export const DELETE_SUCCESS = `${NAME_FUNCION}_DELETE_SUCCESS`;

export const CLONING = `${NAME_FUNCION}_CLONING`;
export const CLONE_FAILED = `${NAME_FUNCION}_CLONE_FAILED`;
export const CLONE_SUCCESS = `${NAME_FUNCION}_CLONE_SUCCESS`;

export default {
    FETCHING,
    RECEIVE,
    DID_INVALIDATION,
    RESET,
    SELECT,
    DELETING,
    DELETE_FAILED,
    DELETE_SUCCESS,
    CLONING,
    CLONE_SUCCESS,
    CLONE_FAILED,
}