export default function Username(firstName: string, lastName: string = "") {
  const username = `${firstName} ${lastName != null ? lastName : ""}`.trim();

  function getFullName() {
    return username;
  }

  function getShortName() {
    return username.length > 20 ? `${username.substring(0, 18)}...` : username;
  }

  function getInitials() {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName
      ? lastName[0].toUpperCase()
      : firstName[1].toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  return {
    getFullName,
    getShortName,
    getInitials,
  };
}
