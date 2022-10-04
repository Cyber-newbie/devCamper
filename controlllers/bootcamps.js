const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })

})

//@desc     create bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });
})


//@desc     Get all bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: bootcamp
    })
    if (!bootcamp) {
        res.status(400).json({
            success: false
        })
    }
})


//@desc     Get single bootcamp
//@route    GET /api/v1/bootcamps/:id 
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)
    res.status(201).json({
        success: true,
        data: bootcamp
    })
    if (!bootcamp) {
        return next(new ErrorResponse(`cannot find data with the id of ${req.params.id}`, 404));
    }

})


//@desc   delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: {}
    })
    if (!bootcamp) {
        res.status(400).json({
            success: false
        })
    }

})