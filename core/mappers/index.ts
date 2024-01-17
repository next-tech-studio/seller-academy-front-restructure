//@ts-ignore
import moment from "jalali-moment";
const $moment = (value: any) => moment(value).locale("fa");

interface Mapping {
  [key: string]: {
    newName?: string;
    defaultValue?: any;
    processValue?: (value: any, object: any) => any;
    setValue?: (value: any) => any;
  };
}

function mapper(
  object: { [key: string]: any },
  mapping: Mapping,
  raw: boolean = true
): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  for (const key in object) {
    if (mapping.hasOwnProperty(key)) {
      const newKey = mapping[key].newName ? mapping[key].newName : key;
      if (object[key] && mapping[key].hasOwnProperty("processValue")) {
        result[newKey] = mapping[key].processValue(object[key], object);
      } else if (!object[key] && mapping[key].hasOwnProperty("defaultValue")) {
        result[newKey] = mapping[key].defaultValue;
      } else {
        result[newKey] = object[key];

      }
    } else if (raw) {
      result[key] = object[key];

    }
  }
  for (const key in mapping) {
    const mappingKey = mapping[key].newName ? mapping[key].newName : key;
    if (mapping[key].hasOwnProperty("setValue"))
      result[mappingKey] = mapping[key].setValue(object);
  }
  return result;
}

function mapperCollection(array: any[], mapping: any, raw: boolean = true) {
  return array.map((a) => mapper(a, mapping, raw));
}

export { mapper, mapperCollection, Mapping, $moment };
