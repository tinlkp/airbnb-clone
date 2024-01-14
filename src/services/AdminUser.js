import { requestApi } from "../configs/callApi";

class AdminUsersService {
  fetchAdminUserApi() {
    return requestApi({
      url: `/users`,
      method: "GET",
    });
  }
  fetchAdminAddUserApi(data) {
    return requestApi({
      url: `/users/create-user`,
      method: "POST",
      data,
    });
  }
  fetchAdminDetailApi(userId) {
    return requestApi({
      url: `/users/get-user-detail/${userId}`,
      method: "GET",
    });
  }
  fetchAdminUpdateApi(userId, data) {
    return requestApi({
      url: `/users/update-user/${userId}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminDeleteApi(userId) {
    return requestApi({
      url: `/users/delete-user/${userId}`,
      method: "DELETE",
    });
  }
  fetchAdminSearchApi(key) {
    return requestApi({
      url: `/users/search-name/${key}`,
      method: "GET",
    });
  }
  fetchAdminImgApi(data) {
    return requestApi({
      url: `/users/upload-avatar`,
      method: "POST",
      data,
    });
  }
}

export const adminUsersService = new AdminUsersService();
