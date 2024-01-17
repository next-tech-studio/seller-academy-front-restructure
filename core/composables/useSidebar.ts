export const useSidebar = (user = {roles:[]}) => {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const checkUserRoles = (roles: String[]) => {
    // return true

    return roles.find((el) => {
      return user?.roles?.includes(el);
    });
  };
  return ref([
    {
      title: t("dashboard"),
      icon: "custom:dashboard",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/panel" }),
    },
    {
      title: t("blog"),
      icon: "custom:blog",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/blog/panel/blog" }),
      children: [
        {
          title: t("add_new_post"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          // to: localePath({ name: "panel-post-draft" }),
          children: [
            {
              title: t("post"),
              roles: ["siteAdmin", "seller"],
              get show() {
                // return checkUserRoles(this.roles);
                return true;
              },
              to: localePath({ path: "/blog/panel/post/draft" }),
            },
            {
              title: t("podcast"),
              roles: ["siteAdmin", "seller"],
              get show() {
                // return checkUserRoles(this.roles);
                return true;
              },
              to: localePath({ path: "/blog/panel/podcast/draft" }),
            },
          ],
        },
        {
          title: t("posts"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/posts" }),
        },
        {
          title: t("podcasts"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/podcasts" }),
        },
        {
          title: t("categories"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/categories" }),
        },
        {
          title: t("tags"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/tags" }),
        },
        {
          title: t("comments"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/comments" }),
        },
      ],
    },
    {
      title: t("academy"),
      icon: "custom:monitor",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      children: [
        {
          title: t("add_new_course"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/course/general" }),
        },
        {
          title: t("courses"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/courses" }),
        },
        {
          title: t("instructors"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/instructors" }),
        },
        {
          title: t("categories"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/categories" }),
        },
        {
          title: t("students"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/students" }),
        },
        {
          title: t("certificates"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true
          },
          to: localePath({ path: "/academy/panel/listings/certificates" }),
        },
        {
          title: t("comments"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/comments" }),
        },
        {
          title: t("skills"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: `/academy/panel/listings/skills` }),
        },
      ],
    },
    {
      title: t("forums"),
      icon: "custom:chat",
      roles: ["siteAdmin", "seller"],
      get show() {
        return checkUserRoles(this.roles);
      },
      children: [
        {
          title: t("questions"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/forum/panel/listings/questions" }),
        },
        {
          title: t("answers"),
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: `/forum/panel/listings/answers` }),
        },
      ],
    },
    {
      title: t("forms"),
      icon: "custom:form",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/panel/listings/forms" }),
    },
    {
      title: t("users"),
      icon: "custom:userSolid",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/panel/listings/users" }),
    },
  ]);
};
