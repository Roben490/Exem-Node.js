import fs from 'fs';
import  Missile  from '../models/missile';
import  Org  from '../models/organization';

export const orgData = JSON.parse(fs.readFileSync('./public/organizations.json', 'utf8'));
export const missileData = JSON.parse(fs.readFileSync('./public/missiles.json', 'utf8'));

async function loadInitialData() {

  if ((await Org.countDocuments()) === 0) {
    await Org.insertMany(orgData);
  }

  if ((await Missile.countDocuments()) === 0) {
    await Missile.insertMany(missileData);
  }
}

export default loadInitialData