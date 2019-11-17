const express = require("express");

const Events = require("./events-model");

const router = express.Router();

router.get("/", (req, res) => {
    Events.getEvents()
      .then(event => {
        for( let i = 0; i < event.length; i++){
          if(event[i].completed == 0){
            event[i].completed = false
                  }
          else{
            event[i].completed = true
          }
        }
        res.status(200).json(event);
      })
      .catch(err => {
        res.status(500).json({ message: "Error fetching events from database" });
      });
  });

  router.get('/vendors',  (req,res) => {
    Events.getVendors()
        .then(allV => {
            res.status(200).json(allV)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: `error retrieving vendors`})
        })
})

router.get('/:id', (req,res) => {
    const {id} = req.params
    Events.getEventById(id)
      .then(event => {
        if(event){
          // res.status(200).json(event);
        if(event.completed == 0){
          res.status(200).json({...event, completed: false})
                }
        else{
          res.status(200).json({...event, completed: true})
        }
        }
        else{
          res.status(404).json({message: `error retrieving the event.`})
        }
        })
  })

  router.get('/vendors/:id',  (req,res) => {
    const { id } = req.params;

  Events.getVendorById(id)
  .then(vendor => {
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: 'Could not find vendor with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get vendors' });
  });
});

router.get('/todos/:id', (req,res) => {
    const {id} = req.params
    Events.getTodoById(id)
      .then(todo => {
        if(todo){
          // res.status(200).json(todo);
        if(todo.completed == 0){
          res.status(200).json({...todo, completed: false})
                }
        else{
          res.status(200).json({...todo, completed: true})
        }
        }
        else{
          res.status(404).json({message: `error retrieving the todo.`})
        }
        })
  })
  
  router.get("/:id/todos",  (req, res) => {
    const id = req.params.id;
    const all = {...req.body, event_id:id}
    Events.getTodosByEvent(id)
      .then(todos => {
        //   console.log(todos)
        if(todos){
            for ( let i = 0; i < todos.length; i++  ){
                if (todos[i].completed == 1) {
                    todos[i].completed = true
                }
                else {
                    todos[i].completed = false
                }
            }
            res.status(200).json(todos)
        } else{
            res.status(404).json({ message: "The event with the specified ID does not exist." })
       }
      })
      .catch(err => {
        res.status(500).json({ error: "did not get todo event" });
      });
});

router.get("/:id/vendors",  (req, res) => {
    const id = req.params.id;
    const all = {...req.body, event_id:id}
    Events.getVendorsByEvent(id)
      .then(vendors => {
        //   console.log(vendors)
        if(vendors){
            res.status(200).json(vendors)
        } else{
            res.status(404).json({ message: "The event with the specified ID does not exist." })
       }
      })
      .catch(err => {
        res.status(500).json({ error: "did not get vendor event" });
      });
});

router.post('/', (req, res) => {
    Events.addEvent(req.body)
    .then(event => {
        res.status(201).json(event)({message: "event posted"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)({message: "event failed to post"})
    })
});

router.post('/vendors', (req, res) => {
    Events.addVendor(req.body)
    .then(vendor => {
        res.status(201).json({message: "vendor posted"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)({message: "vendor failed to post"})
    })
});

router.post('/todos', (req, res) => {
    Events.addTodo(req.body)
    .then(todo => {
        if(todo.completed == 0){
            res.status(200).json({...todo, completed: false})
        }
        else{
            res.status(200).json({...todo, completed: true})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)({message: "todo failed to post"})
    })
    
});

router.delete('/:id', (req, res) => {
    Events.deleteEvent(req.params.id)
    .then(event => {
        console.log(event)
        if (!event) {
            res.status(404).json({message: " No event exists by that ID!"})
        } else {
            res.status(200).json({message: "deleted"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}) 

router.delete('/vendors/:id', (req, res) => {
    Events.deleteVendor(req.params.id)
    .then(vendor => {
        if (!vendor) {
            res.status(404).json({message: " No vendor exists by that ID!"})
        } else {
            res.status(200).json({message: "deleted"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}) 

router.delete('/todos/:id', (req, res) => {
    Events.deleteTodo(req.params.id)
    .then(todo => {
        if (!todo) {
            res.status(404).json({message: " No todo exists by that ID!"})
        } else {
            res.status(200).json({message: "deleted"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


router.put('/:id', (req, res) => {
    Events.updateEvent(req.body, req.params.id )
    .then(event => {
        console.log(event)
        if (!event) {
            res.status(404).json({message: "No event exists by that ID!"})
        } else {
            Events.getEventById(req.params.id)
            .then(uEvent => {
                res.status(201).json(uEvent)
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/vendors/:id', (req, res) => {
    Events.updateVendor(req.body, req.params.id )
    .then(vendor => {
        console.log(vendor)
        if (!vendor) {
            res.status(404).json({message: "No vendor exists by that ID!"})
        } else {
            Events.getVendorById(req.params.id)
            .then(uVendor => {
                res.status(201).json(uVendor)
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/todos/:id', (req, res) => {
    Events.updateTodo(req.body, req.params.id )
    .then(todo => {
        console.log(todo)
        if (!todo) {
            res.status(404).json({message: "No todo exists by that ID!"})
        } else {
            Events.getTodoById(req.params.id)
            .then(uTodo => {
                res.status(201).json(uTodo)
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


  module.exports = router