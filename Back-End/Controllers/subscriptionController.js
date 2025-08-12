import Subscription from '../Models/Subscription.js';

// Create Subscription
export const createSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: 'Plan is required' });
    }

    const subscription = await Subscription.create({
      user: userId,
      plan,
      status: 'Pending',
    });

    res.status(201).json(subscription);
  } catch (err) {
    console.error('Subscription save error:', err);
    res.status(500).json({ message: 'Failed to save subscription' });
  }
};


// Get User Subscription
export const getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });

    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Subscription
export const getAllSubscriptionsForAdmin = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('user', 'username name email role')
      .sort({ createdAt: -1 });

    const formatted = subscriptions.map((sub) => {
      const user = sub.user || {};
      return {
        _id: sub._id,
        userId: user._id || 'Unknown',
        userName: user.username || user.name || 'N/A',
        email: user.email || 'N/A',
        role: user.role || 'user',
        paymentId: sub._id.toString().slice(-6).toUpperCase(),
        amount:
          sub.plan === 'premium' ? 49.99 :
          sub.plan === 'standard' ? 29.99 :
          9.99,
        plan: sub.plan,
        status: sub.status,
        date: new Date(sub.createdAt).toLocaleDateString()
      };
    });

    res.status(200).json(formatted);
  } catch (err) {
    console.error('Admin fetch subscriptions error:', err);
    res.status(500).json({ message: 'Failed to fetch subscriptions' });
  }
};

// Update Subscription
export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Failed to update subscription" });
  }
};

// Delete Subscription
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete subscription" });
  }
};
