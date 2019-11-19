const db = require("../data/dbConfig");

const { addEvent, deleteEvent} = require("./events-model");

describe("events model", function(){
    describe('insert()', () => {
        beforeEach(async () => {
            await db("events").truncate();
          });

        it("should insert event", async function(){
            const event = await db("events");
            expect(event).toHaveLength(0);
            console.log(event)
            await addEvent({
                user_id: 1,
                name: "test event",
                description: "best event!",
                datetime : '2019-01-01 11:00:00'
            })
            const inserted = await db("events")
            expect(inserted).toHaveLength(1);
        })
        it("check the name of inserted event", async function(){
            const event = await db("events");
            expect(event).toHaveLength(0);
            console.log(event)
            await addEvent({
                user_id: 1,
                name: "test event",
                description: "best event!",
                datetime : '2019-01-01 11:00:00'
            })
            const inserted = await db("events")
            expect(inserted[0].name).toBe("test event");
        })

    })

})

describe('deleteEvent', () => {
    it('delete', async () => {
        await deleteEvent(1);
        const event = await db("events");
        expect(event).toHaveLength(0);
    })
    it('remove a event given the ID', async () => {
        addEvent({
                user_id: 1,
                name: "test event",
                description: "best event!",
                datetime : '2019-01-01 11:00:00'
        })
        await deleteEvent(0);
        const event = await db("events")
        expect(event).toHaveLength(1);
    })
}) 

