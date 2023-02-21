const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,

} = require('../../controllers/thoughtController')

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;