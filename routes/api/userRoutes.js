const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

} = require('../../controllers/userController')

// api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

// api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router;