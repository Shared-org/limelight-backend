exports.emailFormat = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
