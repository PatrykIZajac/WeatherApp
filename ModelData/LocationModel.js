import DB from './DB';

export default class LocationModel {
  constructor(placeName, latitude, longitude) {
    this.placeName = placeName;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static getDataFromRealm = async () => {
    let realm = await DB.getRealm();
    return realm.objects('Location');
  };

  static saveDataToRealm = async (location, onResult) => {
    let realm = await DB.getRealm();
    try {
      realm.write(() => {
        realm.create('Location', location);
        onResult(true);
      });
    } catch (e) {
      console.log('Error on creation');
      onResult(false);
    }
  };

  static deleteDataFromRealm = async (placeName) => {
    let realm = await DB.getRealm();
    realm.write(() => {
      console.log('usuwanie z realma');
      let location = realm.objects('Location'); 
      let place = placeName;
      let filterObj = location.filtered('placeName =' +'"'+place+'"');
      realm.delete(filterObj);
      console.log(filterObj);
    });
  };
}
