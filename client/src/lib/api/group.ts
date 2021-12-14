import { ReturnApi } from "../../types/api";
import apiClient from "../client";

export const getGroupsApi = (): Promise<
  ReturnApi<Group.GroupListItemResDTO[]>
> => {
  return apiClient().get<any, ReturnApi<Group.GroupListItemResDTO[]>>("/group");
};

export const deleteGroupApi = (groudId: string): Promise<ReturnApi<any>> => {
  return apiClient().delete<any, ReturnApi<any>>(`/group/${groudId}`);
};

export const createGroupApi = (
  payload: Group.GroupCreateReqDTO
): Promise<ReturnApi<any>> => {
  return apiClient().post<any, ReturnApi<any>>("/group", payload);
};

export const updateGroupApi = (
  payload: Group.GroupUpdateReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, ...payloads } = payload;
  return apiClient().patch<any, ReturnApi<any>>(`/group/${groupId}`, payloads);
};

export const deleteMemberApi = (
  payload: Group.GroupMemberDeleteReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, memberId } = payload;
  return apiClient().delete<any, ReturnApi<any>>(
    `/group/member/${groupId}/${memberId}`
  );
};

export const createGroupMemberApi = (
  payload: Group.GroupMemberCreateReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, ...payloads } = payload;
  return apiClient().post<any, ReturnApi<any>>(
    `/group/member/${groupId}`,
    payloads
  );
};

export const updateGroupMemberApi = (
  payload: Group.GroupMemberUpdateReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, memberId, ...payloads } = payload;
  return apiClient().patch<any, ReturnApi<any>>(
    `/group/member/${groupId}/${memberId}`,
    payloads
  );
};

export const createGroupConditionApi = (
  payload: Group.GroupConditionCreateReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, ...payloads } = payload;
  return apiClient().post<any, ReturnApi<any>>(
    `/group/condition/${groupId}`,
    payloads
  );
};

export const updateGroupConditionApi = (
  payload: Group.GroupConditionUpdateReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, conditionId, ...payloads } = payload;
  return apiClient().patch<any, ReturnApi<any>>(
    `/group/condition/${groupId}/${conditionId}`,
    payloads
  );
};

export const deleteGroupConditionApi = (
  payload: Group.GroupConditionDeleteReqDTO
): Promise<ReturnApi<any>> => {
  const { groupId, conditionId } = payload;
  return apiClient().delete<any, ReturnApi<any>>(
    `/group/condition/${groupId}/${conditionId}`
  );
};
