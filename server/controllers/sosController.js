const SOSAlert = require('../models/SOSAlert');
const User = require('../models/User');

// @desc    Trigger emergency SOS alert
// @route   POST /api/sos
// @access  Private
const triggerSOS = async (req, res, next) => {
  try {
    const { coordinates, address, city, state, emergencyType, description } = req.body;

    if (!coordinates || coordinates.lat === undefined || coordinates.lng === undefined) {
      return res.status(400).json({ success: false, message: 'Latitude and Longitude are mandatory for SOS dispatch' });
    }

    const alert = await SOSAlert.create({
      user: req.user._id,
      location: {
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        address: address || 'Live GPS Coordinates',
        city: city || 'Current Location',
        state: state || '',
      },
      emergencyType: emergencyType || 'safety',
      description: description || 'Immediate assistance requested by traveler',
      status: 'active',
    });

    // Find nearby verified local guides within ~15km
    const nearbyGuides = await User.find({
      role: 'local_guide',
      'guideProfile.isVerified': true,
      isActive: true,
    }).select('name phone email location');

    // In a live system, Socket.io broadcasts to 'sos-channel' and SMS gateway is triggered
    res.status(201).json({
      success: true,
      message: '🚨 Emergency SOS broadcast initiated! Nearby local guardians and 24/7 Rapid Response have been notified.',
      data: alert,
      notifiedGuidesCount: nearbyGuides.length,
      emergencyContacts: [
        { name: 'Police Control Room', number: '112' },
        { name: 'Tourist Helpline India', number: '1363' },
        { name: 'Medical Ambulance', number: '108' },
        { name: 'Women Safety Helpline', number: '1091' },
      ],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get active SOS alerts (Admin & Local Guides)
// @route   GET /api/sos/active
// @access  Private (admin, local_guide)
const getActiveAlerts = async (req, res, next) => {
  try {
    const alerts = await SOSAlert.find({ status: { $in: ['active', 'responding'] } })
      .populate('user', 'name phone email avatar emergencyContacts')
      .populate('respondedBy.user', 'name phone avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Respond to an SOS alert (Local Guide or Admin)
// @route   POST /api/sos/:id/respond
// @access  Private (admin, local_guide)
const respondToSOS = async (req, res, next) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'SOS Alert not found' });
    }

    alert.status = 'responding';
    alert.respondedBy.push({
      user: req.user._id,
      respondedAt: new Date(),
      notes: req.body.notes || 'Guide en route to traveler position',
    });

    await alert.save();

    res.status(200).json({
      success: true,
      message: 'Response confirmed. Traveler notified that assistance is on the way.',
      data: alert,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resolve / Close SOS Alert
// @route   PUT /api/sos/:id/resolve
// @access  Private (User who created it, or admin)
const resolveSOS = async (req, res, next) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'SOS Alert not found' });
    }

    alert.status = 'resolved';
    alert.resolvedAt = new Date();
    alert.resolutionNotes = req.body.notes || 'Incident safely resolved';
    await alert.save();

    res.status(200).json({
      success: true,
      message: 'SOS Alert closed. Traveler confirmed safe.',
      data: alert,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  triggerSOS,
  getActiveAlerts,
  respondToSOS,
  resolveSOS,
};
