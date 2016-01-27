/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Grumman-00001',
      info: 'Covering Area 1'
    }, {
      name: 'Grumman-00002',
      info: 'Covering Area 2 and 23'
    }, {
      name: 'Grumman-00003',
      info: 'Covering Area 3 and 222'
    }, {
      name: 'RideOn-61',
      info: 'Route operates between the following stations:  Shady Grove Station Shady Grove Rd Oakmont Ave ' +
          'Girard St Lakeforest Transit Center Firstfield Rd Clopper Rd-MD 117 Metropolitan Grove MARC Station ' +
          'Germantown Community Center Germantown Rd-MD118 Middlebrook Rd Crystal Rock Dr Germantown Transit Center'
    }, {
      name: 'RideOn-56',
      info: 'Route operates between the following stations:  Lakeforest Transit Center Firstfield & Clopper Rds ' +
          'Quince Orchard Rd & Quince Orchard Blvd Kentlands Blvd. & Tschiffely Square Rd Quince Orchard Rd. & MD 28 ' +
          'Shady Grove Adventist Hospital Wootton Parkway & Hurley Ave Maryland Ave & Falls Rd Rockville Metro Station'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
