import axios from "axios";
import { get, post } from "../services/api.service";
import authService from "../services/auth.service";
import { API_URL } from "../config/config";

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUserData = async () => {
  let url = "users/user";
  try {
    let body = {};
    const response = await get(url, body);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const fetchProfileData = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + "users/me")
    .then((response) => {
      if (response.data.success === true) {
        return { status: true, data: response.data.user };
      } else if (response.data.success === false) {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const editProfileData = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .put(API_URL + "users/admin/update", body)
    .then((response) => {
      if (response.data.success === true) {
        return { status: true, data: response.data.user.about };
      } else if (response.data.success === false) {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const fetchUserLoginData = async (body) => {
  return await axiosApi
    .post(API_URL + "users/login", body)
    .then((response) => {
      if (response.data.success === true) {
        return { status: true, data: response.data };
      } else if (response.data.success === false) {
        return { status: false };
      }
    })
    .catch((err) => {
      console.error("Error fetching user data:", err);
    });
};

//skill

export const addSkill = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .post(API_URL + "skills/add", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const editSkill = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .put(API_URL + "skills/edit", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getSkillById = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + `skills/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const deleteSkill = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .delete(API_URL + `skills/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getSkillList = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + "skills/list", { params })
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getSkillCategories = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + "skills/get-categories", { params })
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};

//experience
export const addExperience = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .post(API_URL + "experience/add", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const editExperience = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .put(API_URL + "experience/edit", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getExperienceById = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + `experience/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const deleteExperience = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .delete(API_URL + `experience/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getExperienceList = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + "experience/list", { params })
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};

//project
export const addProject = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .post(API_URL + "project/add", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const editProject = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .put(API_URL + "project/edit", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const editProjectStatus = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .patch(API_URL + "project/edit-status", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getProjectById = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + `project/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const deleteProject = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .delete(API_URL + `project/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getProjectList = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + "project/list", { params })
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};

//education
export const addEducation = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .post(API_URL + "education/add", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const editEducation = async (body) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .put(API_URL + "education/edit", body)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getEducationById = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + `education/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const deleteEducation = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .delete(API_URL + `education/${params}`)
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
export const getEducationList = async (params) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return await axiosApi
    .get(API_URL + "education/list", { params })
    .then((response) => {
      if (response.data.status === "success") {
        return { status: true, data: response.data.data };
      } else if (response.data.status === "fail") {
        return { status: false };
      }
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 403) {
        authService.autoLogout();
        window.location.href = "/login";
      }
    });
};
