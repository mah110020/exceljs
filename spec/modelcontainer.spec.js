var fs = require("fs");
var _ = require("underscore");
var Excel = require("../excel");
var model = require("./testmodel");

describe("ModelContainer", function() {
    it("serializes and deserializes to file properly", function(done) {
        // clone model
        var mcModel = JSON.parse(JSON.stringify(model));
        
        var mc = new Excel.ModelContainer(model);
        //fs.writeFileSync("./testmodel1.json", JSON.stringify(model, null, "    "));
        mc.xlsx.writeFile("./mc.test.xlsx")
            .then(function() {
                var mc2 = new Excel.ModelContainer();
                return mc2.xlsx.readFile("./mc.test.xlsx");
            })
            .then(function(mc2) {
                fs.writeFileSync("./testmodel2.json", JSON.stringify(mc2.model, null, "    "));
                
                expect(mc2.model).toEqual(mcModel);
                //expect(_.isEqual(mc2.model,mc.model)).toBeTruthy();
            })
            .finally(function() {
                fs.unlink("./mc.test.xlsx", function(error) {
                    expect(error && error.message).toBeFalsy();
                    done();
                });
            }); 
    });
});
