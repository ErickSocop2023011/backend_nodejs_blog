import Post from './post.model.js';

export const createPost = async (req, res) => {
    try {
        const data = req.body;

        const post = await Post.create(data);

        res.status(201).json({
          success: true,
          msg: "Post created successfully",
          post
        });
    } catch (err) {
        res.status(400).json({ 
          success: false,
          msg: "Error creating post",
          error: err.message
        });
    }
};

export const getPosts = async (req, res) => {
  try {
    const { limit = 10, from = 0 } = req.query;
    const query = { status : true };
    const [total, posts] = await Promise.all([
      Post.countDocuments(query),
      Post.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .sort({ date: -1 })
        //.populate("comments", "name text date")
    ]);

    return res.status(200).json({
      success: true,
      total,
      posts,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching posts",
      error: err.message 
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { pid } = await Post.findById(req.params);
    const post = await Post.findById(pid)
    //.populate("comments", "name text date");
    if(!post){
      return res.status(404).json({
        success: false,
        msg: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });

  } catch (err) {
    res.status(500).json({ 
      success: false,
      msg: "Error fetching post",
      error: err.message });
  }
};

export const filterPosts = async (req, res) => {

  try {
    const { course } = req.query;
    const query = { status: true };
    if (course) {
      query.course = course;
    }
    const posts = await Post.find(query).sort({ date: -1 });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export const addComment = async (req, res) => {
  try {
    const { name, text } = req.body;
    if (!name || !text) return res.status(400).json({ error: "Nombre y comentario son obligatorios" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    post.comments.unshift({ name, text }); // agrega al principio
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar publicación
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post no encontrado" });
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
