import { Mapping, $moment } from "~/mappers";

const personalInfo: Mapping = {
  avatarUrl: {
    processValue: (value) => {
      console.log('value',value)
      return { url: value };
    },
  },
  //   birthday: {
  //     processValue: (value) =>
  //       process.client ? $moment(value).format("jYYYY/jMM/jDD") : "",
  //   },
};

export default personalInfo;
