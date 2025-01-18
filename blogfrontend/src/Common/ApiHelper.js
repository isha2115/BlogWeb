import axios from "axios";

class ApiHelper {
  constructor() {
    axios.interceptors.request.use(
      function (config) {
  
        config.headers["Authorization"] = localStorage.getItem("token");
        return config;
      },
      function (error) {
      
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (config) {
      
        return config;
      },
      function (error) {
        if (
          error?.response?.status === 400 &&
          error.response.data.message === "Unauthorized"
        ) {
          if (window.location.pathname !== "/") {
            window.location.pathname = "/";
          }
        }
      
        return Promise.reject(error);
      }
    );
    this.baseUrl = "http://localhost:5000";
  }

  getCatgory() {
    return axios.get(`${this.baseUrl}/category`);
  }

  addCategory(categoryDetails) {
    return axios.post(`${this.baseUrl}/category`, categoryDetails);
  }

  
  getBlog() {
    return axios.get(`${this.baseUrl}/blog`);
  }

  addBlog(blogdetails) {
    return axios.post(`${this.baseUrl}/blog`, blogdetails);
  }

  updateBlog(blogdetails) {
    return axios.put(`${this.baseUrl}/blog`, blogdetails);
  }

  removeBlog(id) {
    return axios.delete(`${this.baseUrl}/blog/${id}`);
  }
  fetchOneBlog(id) {
    return axios.get(`${this.baseUrl}/blog/${id}`);
  }
 
  userLogin(userDetails) {
    return axios.post(`${this.baseUrl}/login`, userDetails);
  }
  userSignUp(data){
    return axios.post(`${this.baseUrl}/user`, data);

  }
}

const apiHelper = new ApiHelper();
export default apiHelper;
