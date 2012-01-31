describe("Model Validations", function() {

  beforeEach(function() {
    //instantiate a model
    this.model = new Gazler.Model();
    //A Url property must be specified
    this.model.url = "/";
  });

  describe("required", function() {
  
    it("should add an error when a required field is blank", function() {
      this.model.validates = {
        required: ["name"]
      };

      this.model.validate();
      expect(this.model.errors).toEqual({"name": ["is required"]});

    });

    it("should allow required on more than one field", function() {
      this.model.validates = {
        required: ["name", "description"]
      };

      this.model.validate();
      expect(this.model.errors).toEqual({"name": ["is required"], "description": ["is required"]});
    });

    it("should not return anything if there are no required fields", function() {
      expect(this.model.validate()).toEqual(undefined);
    });
    
    
    
  });
  
});
  
