const assert = require('assert');
const Registry = require('../models/Registry');


describe('Signing up', function() {
   let data = [
      {
        "firstName": "Rob",
        "lastName": "Roch",
        "email": "robert@interia.eu",
        "date": "2018-04-04T00:00:00.000Z"
      },
      {
        "firstName": "Robert",
        "lastName": "Rochon",
        "email": "robert123@interia.eu",
        "date": "2028-04-04T00:00:00.000Z"
      }
    ];
  let wrongData = [
      {
        "lastName": "Roch",
        "email": "robert@interia.eu",
        "date":  "2018-04-04T00:00:00.000Z"
      },
      {
        "firstName": "Rob",
        "email": "robert@interia.eu",
        "date":  "2018-04-04T00:00:00.000Z"
      },
      {
        "firstName": "Rob",
        "lastName": "Roch",
        "email": "123123.eu",
      },
      {
        "firstName": "Rob",
      }
  ];

  data.forEach(function (dataItem) {
    it('Should save without error', (done) => {
      let user = new Registry(dataItem);
      console.log(user);
      user.save((err) => {
        if(err) return handleError(err);
      }).then(()=>{
        assert(user.isSaved);
        done();
      });
    });
  });

  wrongData.forEach(function (dataItem) {
    it('Should give error', (done) => {
      let user = new Registry(dataItem);
      console.log(user);
      user.save((err) => {
        if(err) return handleError(err);
      }).then(()=>{
        assert(user.isSaved);
        done();
      });
    });
  });
});
