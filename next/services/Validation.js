class Validation {
  constructor(app) {
    const $t = app.$i18n.t;
    this.rules = {
      required: (v, attribute = "") => {
        const result =
          !!v ||
          $t("پر کردن این فیلد اجباری است.", {
            attribute,
          });
        this.setMessage(result, attribute);
        return result;
      },
      digits: (v, attribute = "", digits) =>
        v.length == digits ||
        $t("validation.digits", {
          attribute,
          digits,
        }),
      checked: (v, attribute = "", digits) =>
        v == true ||
        $t("validation.checked", {
          attribute,
        }),
      // digits_between: (v, min, max) =>
      //   (v.length >= min && v.length <= max) ||
      //   $t("validation.digits_between"),
      digits_between: (v, attribute = "", min, max) =>
        (v.length >= min && v.length <= max) ||
        $t("validation.digits_between", { max }),
      image_count_constraint: (v, attribute, count = 3) =>
        v.length > count ||
        $t("validation.image_count", {
          attribute,
          digits,
        }),
      persian: (v, attribute = "") => {
        const result =
          /^[\u0600-\u06FF\s]+$/.test(v) ||
          $t("validation.persian", {
            attribute,
          });
        this.setMessage(result);
        return result;
      },
      english: (v, attribute = "") => {
        const result =
          /^[A-Za-z0-9]*$/.test(v) ||
          $t("validation.english", {
            attribute,
          });
        this.setMessage(result);
        return result;
      },
      email: (v, attribute = "") => {
        const result =
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "یک ایمیل معتبر وارد نمایید.";
        this.setMessage(result, attribute);
        return result;
      },
      mobile: (v, attribute = "") => {
        const result =
          /^09\d{9}$/.test(v) ||
          "یک شماره موبایل معتبر وارد نمایید.";
        this.setMessage(result, attribute);
        return result;
      },
    };
  }

  messages = {};

  getRules = (rules, v) => {
    const rulesArr = [];
    const attribute = Object.keys(rules)[0];
    rules[attribute].split("|").forEach((item, i) => {
      const key = item.split(":")[0];
      const params = item.split(":")[1]?.split(",") || [];
      rulesArr.push(() => this.rules[key](v, attribute, ...params));
    });
    return rulesArr;
  };

  setMessage(result, attribute) {
    if (typeof result == "string") {
      this.messages[attribute] = result;
      // this.messages[attribute] = [];
      // if (!this.messages[attribute].includes(result))
      //   this.messages[attribute].push(result);
    } else {
      delete this.messages[attribute];
    }
  }

  submitValidForm(form_ref, callback) {
    if (form_ref.value.validate()) {
      () => callback();
    }
  }
}

export default Validation;
