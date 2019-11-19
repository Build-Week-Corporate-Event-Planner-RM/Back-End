const db = require("../data/dbConfig");

const { addVendor, deleteVendor} = require("./events-model");

describe("events model", function(){
    describe('insert()', () => {
        beforeEach(async () => {
            await db("vendors").truncate();
          });

        it("should insert vendor", async function(){
            const vendor = await db("vendors");
            expect(vendor).toHaveLength(0);
            console.log(vendor)
            await addVendor({
                name: "test vendor",
                
            })
            const inserted = await db("vendors")
            expect(inserted).toHaveLength(1);
        })
        it("check the name of inserted vendor", async function(){
            const vendor = await db("vendors");
            expect(vendor).toHaveLength(0);
            console.log(vendor)
            await addVendor({
                name: "test vendor",
            })
            const inserted = await db("vendors")
            expect(inserted[0].name).toBe("test vendor");
        })

    })

})

describe('deleteVendor', () => {
    it('delete', async () => {
        await deleteVendor(1);
        const vendor = await db("vendors");
        expect(vendor).toHaveLength(0);
    })
    it('remove a vendor given the ID', async () => {
        addVendor({
            name: "test vendor",
        })
        await deleteVendor(0);
        const vendor = await db("vendors")
        expect(vendor).toHaveLength(1);
    })
}) 

