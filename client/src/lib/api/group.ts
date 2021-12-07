import { ReturnApi } from "../../types/api";
import apiClient from "../client";

export const getGroupsApi = (): Promise<
  ReturnApi<Group.GroupListItemResDTO[]>
> => {
  return apiClient().get<any, ReturnApi<Group.GroupListItemResDTO[]>>("/group");
};

export const createGroupApi = (
  payload: Group.GroupCreateReqDTO
): Promise<ReturnApi<any>> => {
  return apiClient().post<any, ReturnApi<any>>("/group", payload);
};
