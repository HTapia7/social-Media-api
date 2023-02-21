const { User, Thought, } = require('../models');
const userController = require('./userController');

module.exports = {

// GET
    getThoughts(req, res) {
        Thought.find()
            .populate('reactions')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
// GET
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions')
        .select('-__V')
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought with this ID'})
            : res.json(thought));
    },
// POST
createThought({ body }, res ){
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            {_id: body.userId},
            {$push: {thoughts: _id }},
            {new: true }
        );
    })
    .then((user) => 
        !user
        ?res
            .status(404)
            .json({ message: "No user with that ID"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
},
// PUT
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with that ID"})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
// DELETE
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId })
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : Thought.deleteOne({ _id: req.params.thoughtId })
        )
        .then(() => res.json({ message: 'Thought deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
    
    addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  // DELETE
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

};



