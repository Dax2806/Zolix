import Notification from "../models/notification.model.js";

// CREATE NOTIFICATION
import { getIO } from "../socket/socket.server.js";

export const createNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.create({
          userId: req.user._id,
          title: req.body.title,
          message: req.body.message,
          type: req.body.type,
        });

      // REAL-TIME EMIT
      const io = getIO();

      if (io) {
        io.to(req.user._id.toString()).emit(
          "notification:new",
          notification
        );
      }

      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET USER NOTIFICATIONS
export const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          userId: req.user._id,
        }).sort({ createdAt: -1 });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// MARK AS READ
export const markAsRead =
  async (req, res) => {
    try {
      const updated =
        await Notification.findByIdAndUpdate(
          req.params.id,
          { read: true },
          { new: true }
        );

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };