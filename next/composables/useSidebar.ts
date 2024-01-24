export const useSidebar = (user = { roles: [] }) => {
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
      title: "dashboard",
      icon: "custom:dashboard",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/panel" }),
    },
    {
      title: "blog",
      icon: "custom:blog",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/blog/panel/blog" }),
      children: [
        {
          title: "add_new_post",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          // to: localePath({ path: "panel/post/draft" }),
          children: [
            {
              title: "post",
              roles: ["siteAdmin", "seller"],
              get show() {
                // return checkUserRoles(this.roles);
                return true;
              },
              to: localePath({ path: "/blog/panel/post/draft" }),
            },
            {
              title: "podcast",
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
          title: "posts",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/posts" }),
        },
        {
          title: "podcasts",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/podcasts" }),
        },
        {
          title: "categories",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/categories" }),
        },
        {
          title: "tags",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/blog/panel/listings/tags" }),
        },
        {
          title: "comments",
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
      title: "academy",
      icon: "custom:monitor",
      roles: ["siteAdmin", "seller"],
      get show() {
        return checkUserRoles(this.roles);
      },
      children: [
        {
          title: "add_new_course",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          // to: localePath({ path: "academy/panel/course/id/general" }),
          children: [
            {
              title: "product",
              roles: ["siteAdmin", "seller"],
              get show() {
                // return checkUserRoles(this.roles);
                return true;
              },
              to: localePath({ path: "/academy/panel/product/general" }),
            },
            {
              title: "course",
              roles: ["siteAdmin", "seller"],
              get show() {
                // return checkUserRoles(this.roles);
                return true;
              },
              to: localePath({ path: "/academy/panel/course/general" }),
            },
          ],
        },
        {
          title: "courses",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/courses" }),
        },
        {
          title: "products",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/products" }),
        },
        {
          title: "course_instructors",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/instructors" }),
        },
        {
          title: "categories",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/categories" }),
        },
        {
          title: "students",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/students" }),
        },
        {
          title: "certificates",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/certificates" }),
        },
        {
          title: "comments",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/comments" }),
        },
        {
          title: "skills",
          roles: ["siteAdmin", "seller"],
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
          to: localePath({ path: "/academy/panel/listings/skills" }),
        },
      ],
    },
    {
      title: "forums",
      icon: "custom:chat",
      roles: ["siteAdmin", "seller"],
      get show() {
        return checkUserRoles(this.roles);
      },
    },
    {
      title: "users",
      icon: "custom:people",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      to: localePath({ path: "/panel/listings/users" }),
    },
    {
      title: "mentorship",
      icon: "custom:blog",
      roles: ["siteAdmin", "seller"],
      get show() {
        // return checkUserRoles(this.roles);
        return true;
      },
      children: [
        {
          title: "mentors",
          roles: ["siteAdmin"],
          to: localePath({ path: "/panel/mentorship/mentors" }),
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
        },
        {
          title: "categories",
          roles: ["siteAdmin"],
          to: localePath({ path: "/panel/mentorship/categories" }),
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
        },
        {
          title: "requests",
          roles: ["siteAdmin"],
          to: localePath({ path: "/panel/mentorship/requests" }),
          get show() {
            // return checkUserRoles(this.roles);
            return true;
          },
        },
      ],
    },
  ]);
};
