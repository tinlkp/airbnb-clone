import { requestApi } from "../configs/callApi";


class UserService {
  loginApi = (data) => {
    return requestApi({
      url: "/auth/signin",
      method: "POST",
      data,
    })
  }
  registerApi(data) {
    return requestApi({
      url: "/auth/signup",
      method: "POST",
      data,
    })
  }
  userInfoApi(id) {
    return requestApi({
      url: `/users/get-user-detail/${id}`,
      method: "GET",
    })
  }
  updateUserInfoApi(id, data) {
    return requestApi({
      url: `/users/update-user/${id}`,
      method: "PUT",
      data,
    })
  }
  uploadAvatarApi(data) {
    return requestApi({
      url: "/users/upload-avatar",
      method: "POST",
      data,
    })
  }


}
export const userService = new UserService();
