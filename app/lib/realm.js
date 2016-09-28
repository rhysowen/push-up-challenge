import Realm from 'realm';

const SCHEMA_VERSION = 0;

// Based from https://github.com/realm/realm-js/issues/141
class Exercise extends Realm.Object {
  static save(schema, props) {
    let saved = null;

    const obj = Object.assign(
      {},
      props
    );

    const newExercise = { id: obj.id, programId: obj.programId, dayId: obj.dayId };

    if (obj.id === undefined) {
      let exercise = realm.objects(schema).filtered(`name = "${schema}"`)[0];
      if (exercise === undefined) {
        exercise = realm.create(schema, newExercise);
      }
      obj.id = exercise.next();
    } else {
      const existingExercise = Object.assign(
        {},
        newExercise,
        obj.id
      );
      saved = realm.create(schema, existingExercise, true);
    }

    return Object.assign(
      {},
      saved
    );
  }

  next() {
    this.value = this.value + 1;
    return this.value;
  }
}

Exercise.schema = {
  name: 'Exercise',
  primaryKey: 'id',
  properties: {
    id: 'int',
    programId: { type: 'int', optional: true },
    dayId: { type: 'int', optional: true },
  },
};

const realm = new Realm({
  schema: [Exercise],
  schemaVersion: SCHEMA_VERSION,
});

export { Exercise, realm };
