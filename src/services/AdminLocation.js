import { requestApi } from "../configs/callApi";

class AdminLocationService {
  fetchAdminLocationApi() {
    return requestApi({
      url: `/vi-tri`,
      method: "GET",
    });
  }
  fetchAdminAddLocationApi(data) {
    return requestApi({
      url: `/vi-tri/create-location`,
      method: "POST",
      data,
    });
  }
  fetchAdminDetailLocationApi(id) {
    return requestApi({
      url: `/vi-tri/location-detail/${id}`,
      method: "GET",
    });
  }

  fetchAdminDeleteLocationApi(id) {
    return requestApi({
      url: `/vi-tri/delete-location/${id}`,
      method: "DELETE",
    });
  }
  fetchAdminEditLocationApi(id, data) {
    return requestApi({
      url: `/vi-tri/update-location/${id}`,
      method: "PUT",
      data,
    });
  }
  fetchAdminImgLocationApi(id, data) {
    return requestApi({
      url: `/vi-tri/upload-img-location/${id}`,
      method: "POST",
      data,
    });
  }
}

export const adminLocalService = new AdminLocationService();
