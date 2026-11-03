const Place = require('../models/Place');
const Review = require('../models/Review');

// @desc    Create a new place
// @route   POST /api/places
// @access  Private (admin, local_guide)
const createPlace = async (req, res, next) => {
  try {
    const placeData = {
      ...req.body,
      addedBy: req.user._id,
    };

    const place = await Place.create(placeData);

    res.status(201).json({
      success: true,
      message: 'Place created successfully',
      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all places with filters
// @route   GET /api/places
// @access  Public
const getPlaces = async (req, res, next) => {
  try {
    const {
      category,
      state,
      city,
      search,
      ecoFriendly,
      crowdLevel,
      sortBy = 'rating',
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (ecoFriendly === 'true') filter.ecoFriendly = true;
    if (crowdLevel) filter.crowdLevel = crowdLevel;
    if (search) {
      filter.$text = { $search: search };
    }

    let sortOption = {};
    switch (sortBy) {
      case 'rating':
        sortOption = { 'rating.average': -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { 'rating.average': -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [places, total] = await Promise.all([
      Place.find(filter)
        .populate('addedBy', 'name avatar')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      Place.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: places.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single place by ID
// @route   GET /api/places/:id
// @access  Public
const getPlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate('addedBy', 'name avatar role')
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name avatar' },
        options: { sort: { createdAt: -1 }, limit: 10 },
      });

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found',
      });
    }

    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a place
// @route   PUT /api/places/:id
// @access  Private (admin, original creator)
const updatePlace = async (req, res, next) => {
  try {
    let place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found',
      });
    }

    // Only admin or original creator can update
    if (
      req.user.role !== 'admin' &&
      place.addedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this place',
      });
    }

    place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Place updated successfully',
      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a place
// @route   DELETE /api/places/:id
// @access  Private (admin)
const deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found',
      });
    }

    place.isActive = false;
    await place.save();

    res.status(200).json({
      success: true,
      message: 'Place deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get places by category
// @route   GET /api/places/category/:category
// @access  Public
const getPlacesByCategory = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {
      category: req.params.category,
      isActive: true,
    };

    const [places, total] = await Promise.all([
      Place.find(filter)
        .populate('addedBy', 'name avatar')
        .sort({ 'rating.average': -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Place.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: places.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearby places
// @route   GET /api/places/nearby
// @access  Public
const getNearbyPlaces = async (req, res, next) => {
  try {
    const { lat, lng, radius = 50, limit = 20 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const radiusKm = parseFloat(radius);

    // Approximate degree conversion (1 degree ≈ 111 km)
    const latRange = radiusKm / 111;
    const lngRange = radiusKm / (111 * Math.cos((latNum * Math.PI) / 180));

    const places = await Place.find({
      isActive: true,
      'location.coordinates.lat': {
        $gte: latNum - latRange,
        $lte: latNum + latRange,
      },
      'location.coordinates.lng': {
        $gte: lngNum - lngRange,
        $lte: lngNum + lngRange,
      },
    })
      .populate('addedBy', 'name avatar')
      .sort({ 'rating.average': -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
  getPlacesByCategory,
  getNearbyPlaces,
};
