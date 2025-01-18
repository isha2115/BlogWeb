import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Container,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiHelper from "../Common/ApiHelper";

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const [Category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // 'add' or 'edit'
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    category: false,
  });

  const categories = Category;

  const handleOpen = async (mode, blogId = null) => {
    setDialogMode(mode);
    setCurrentBlogId(blogId);

    if (mode === "edit" && blogId !== null) {
      try {
        const result = await apiHelper.fetchOneBlog(blogId); // Await the API call
        if (result.data && result.data.result) {
          setBlogForm({
            title: result.data.result.title,
            description: result.data.result.description,
            category: result.data.result.category._id,
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    } else {
      setBlogForm({ title: "", description: "", category: "" });
    }

    setOpen(true);
    setErrors({ title: false, description: false, category: false });
  };

  const handleClose = () => {
    setOpen(false);
    setBlogForm({ title: "", description: "", category: "" });
    setErrors({ title: false, description: false, category: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogForm({ ...blogForm, [name]: value });

    // Clear the error for the current field
    setErrors({ ...errors, [name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      title: blogForm.title.trim() === "",
      description: blogForm.description.trim() === "",
      category: blogForm.category.trim() === "",
    };
    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).includes(true);
  };

  const handleSaveBlog = () => {
    if (!validateForm()) {
      return; // If validation fails, stop execution
    }

    if (dialogMode === "add") {
      addBlogs();
    } else if (dialogMode === "edit" && currentBlogId !== null) {
      updateBlogs();
    }

    handleClose();
  };

const deleteBlog = async (id) => {
  try {
    const Confirm = window.confirm("Are you sure to delete this Blog");
    if (!Confirm) return;
    // eslint-disable-next-line
    const result = await apiHelper.removeBlog(id);
    getBlog();
  } catch (error) {
    
  }
};

  const addBlogs = async () => {
    try {
      // eslint-disable-next-line
      const data = {
        ...blogForm,
      };

      const result = await apiHelper.addBlog(data);

      if (result.status == 200) {
        getBlog();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlogs = async () => {
    try {
      const data = {
        ...blogForm,
        _id: currentBlogId,
      };

      await apiHelper.updateBlog(data);
      getBlog();
    } catch (error) {
      console.log(error);
    }
  };

  const getBlog = async () => {
    try {
      const result = await apiHelper.getBlog();

      if (result.data && result.data.result) {
        setBlogs(result.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const result = await apiHelper.getCatgory();
      if (result.data && result.data.result) {
        setCategory(result.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
    getCategory();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Blog Listing
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpen("add")}
        style={{ marginBottom: "1rem" }}
      >
        Add Blog
      </Button>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card variant="outlined">
              <CardHeader
                title={blog.title}
                titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {blog.description}
                </Typography>
                <Chip label={blog.category.name} color="primary" />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen("edit", blog._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Blog Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {dialogMode === "add" ? "Add New Blog" : "Edit Blog"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Title"
            name="title"
            fullWidth
            value={blogForm.title}
            onChange={handleChange}
            error={errors.title}
            helperText={errors.title ? "Title is required" : ""}
          />
          <TextField
            margin="normal"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={blogForm.description}
            onChange={handleChange}
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
          />
          <TextField
            margin="normal"
            label="Category"
            name="category"
            fullWidth
            select
            value={blogForm.category}
            onChange={handleChange}
            error={errors.category}
            helperText={errors.category ? "Category is required" : ""}
          >
            {categories.map((category, index) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveBlog} color="primary">
            {dialogMode === "add" ? "Add Blog" : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogListing;
