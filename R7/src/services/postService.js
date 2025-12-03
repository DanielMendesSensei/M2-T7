import prisma from "../config/prisma.js";

export const postService = {
  async createPost(postData) {
    const { title, content, tags, userId } = postData;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags: tags ? JSON.stringify(tags) : null,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Parse tags back to array
    if (post.tags) {
      post.tags = JSON.parse(post.tags);
    }

    return post;
  },

  async getAllPosts(filters) {
    const { page = 1, limit = 10, isPublished, userId } = filters;
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    const where = {};
    if (isPublished !== undefined) {
      where.isPublished = isPublished === "true";
    }
    if (userId) {
      where.userId = parseInt(userId);
    }

    const [posts, count] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    // Parse tags for all posts
    const postsWithParsedTags = posts.map((post) => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : null,
    }));

    return {
      posts: postsWithParsedTags,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: take,
      },
    };
  },

  async getPostById(postId) {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    // Parse tags
    if (post.tags) {
      post.tags = JSON.parse(post.tags);
    }

    return post;
  },

  async updatePost(postId, postData) {
    const { title, content, tags, isPublished } = postData;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) updateData.tags = JSON.stringify(tags);
    if (isPublished !== undefined) updateData.isPublished = isPublished;

    try {
      const post = await prisma.post.update({
        where: { id: parseInt(postId) },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // Parse tags
      if (post.tags) {
        post.tags = JSON.parse(post.tags);
      }

      return post;
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Post not found");
      }
      throw error;
    }
  },

  async deletePost(postId) {
    try {
      await prisma.post.delete({
        where: { id: parseInt(postId) },
      });

      return { message: "Post deleted successfully" };
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Post not found");
      }
      throw error;
    }
  },

  async togglePostPublish(postId) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const updatedPost = await prisma.post.update({
        where: { id: parseInt(postId) },
        data: {
          isPublished: !post.isPublished,
        },
      });

      return {
        message: `Post ${
          updatedPost.isPublished ? "published" : "unpublished"
        } successfully`,
        isPublished: updatedPost.isPublished,
      };
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error("Post not found");
      }
      throw error;
    }
  },
};
