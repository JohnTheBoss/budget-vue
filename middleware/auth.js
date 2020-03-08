export default function ({ app, redirect }) {
    if (app.$fireAuth.currentUser === null) {
      return redirect('/auth/login');
    }
  }