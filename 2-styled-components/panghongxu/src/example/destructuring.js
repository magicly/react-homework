function userId({ id }) {
  return id;
}

function whois({
  displayName = 1,
  fullName: { firstName } }
) {
  // function whois(user){
  // const displayName = user.displayName;
  // const fullName = user.fullName;
  // const name = fullName.firstName;
  console.log(displayName + " is " + firstName);
}

var user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "John",
    lastName: "Doe"
  }
};

console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
