import UserServices from "../services/users.services.js";
const userService = new UserServices();

export default class UserController {
  async register(req, res, next) {
    console.log(req.body);
    try {
      const user = await userService.register(req.body);
      if (user) res.redirect("/views/login");
      else res.redirect("/views/register-error");
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);

      if (user) {
        req.session.email = email;
        req.session.password = password;

        if (user.role === "user") {
          res.redirect("/views/profile");
        } else if (user.role === "admin") {
          res.redirect("/views/admin-profile");
        } else {
          res.redirect("/views/profile");
        }
      } else {
        res.redirect("/views/register-error");
      }
    } catch (error) {
      next(error);
    }
  }
}