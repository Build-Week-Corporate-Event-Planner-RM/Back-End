const db = require("../data/dbConfig");

const { addTodo} = require("./events-model");

describe("events model", function(){
    describe('insert()', () => {
        beforeEach(async () => {
            await db("todos").truncate();
          });

        it("should insert todo", async function(){
            const todo = await db("todos");
            expect(todo).toHaveLength(0);
            console.log(todo)
            await addTodo({
                event_id: 1,
                name: "test todo",
                completed: 1,
            })
            const inserted = await db("todos")
            expect(inserted).toHaveLength(1);
        })
    })

})



