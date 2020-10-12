import Realm from "realm";

const Location = {
    name: "Location",
    primaryKey: "placeName",
    properties: {
      placeName:"string",
      latitude:"double",
      longitude:"double"
    }
  };

export default class DB {
  static getRealm = async () => {
    try {
      let realm = await Realm.open({
        schema: [Location],
        schemaVersion: 0
      });
      return realm;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
